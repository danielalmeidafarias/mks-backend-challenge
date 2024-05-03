import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from "./user.repository";
import { AuthService } from 'src/auth/auth.service';
import { DeleteUserDTO } from './dto/delete-user.dto';
import { MoviesRepository } from 'src/movies/movies.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository) private userRepository: UserRepository,
    @Inject(AuthService) private authService: AuthService,
    @Inject(MoviesRepository) private moviesRepository: MoviesRepository
  ) { }

  private async verifyThereIsNoUserWithEmail(email: string) {
    const already_user = await this.userRepository.findOneByEmail(email)

    if (already_user) {
      throw new HttpException("There is an user with this email already", HttpStatus.BAD_REQUEST)
    }
  }

  async create({ email, password }: CreateUserDto) {
    await this.verifyThereIsNoUserWithEmail(email)

    const hashed_password = await this.authService.hashPassword(password)

    const { id } = (await this.userRepository.create(new User({ email, password: hashed_password }))).identifiers[0]

    const { refresh_token } = await this.authService.getRefreshToken(id, email)

    return { refresh_token }
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneById(id)

    const users_movies = await this.moviesRepository.getUsersMovies(id)

    return { user, users_movies }
  }

  // Retonar usuário nas rotas que for necessário
  // Retornar mensagens de confimação da requisição


  async findAll() {
    const users = await this.userRepository.findAll()

    return users
  }

  async update({ access_token, email, password }: UpdateUserDto) {
    const { id } = await this.authService.decodeToken(access_token)

    const user = await this.userRepository.findOneById(id)

    const hashed_password = password ? await this.authService.hashPassword(password) : user.password

    const update_user_params = {
      email: email && email !== user.email ? email : user.email,
      password: password && hashed_password !== user.password ? hashed_password : user.password,
    }

    const updated_user = new User({ email: update_user_params.email, password: update_user_params.password, id: user.id })

    await this.userRepository.update(updated_user)
  }

  async remove({ access_token, password }: DeleteUserDTO) {
    const { id } = await this.authService.decodeToken(access_token)

    const user = await this.userRepository.findOneById(id)

    await this.authService.verifyPassword(password, user.password)

    await this.userRepository.delete(user.id)

    return
  }
}
