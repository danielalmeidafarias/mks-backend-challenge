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

  private async verifyThereIsNoUserWithNickname(nickname: string) {
    const already_user = await this.userRepository.findOneByNickname(nickname)

    if (already_user) {
      throw new HttpException("There is an user with this nickname already", HttpStatus.BAD_REQUEST)
    }
  }

  async create({ email, password, nickname }: CreateUserDto) {
    await this.verifyThereIsNoUserWithEmail(email)

    await this.verifyThereIsNoUserWithNickname(nickname)

    const hashed_password = await this.authService.hashPassword(password)

    const { id } = (await this.userRepository.create(new User({ email, password: hashed_password, nickname }))).identifiers[0]

    const { refresh_token } = await this.authService.getRefreshToken(id, email)

    return { refresh_token }
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneById(id)

    const users_movies = await this.moviesRepository.search({ user_id: user.id, country_code: null, genre: null, language_code: null, rating: null, title: null, })

    return { user, users_movies }
  }

  async findAll(nickname?: string) {
    const users = await this.userRepository.findAll(nickname)

    if (users.length < 1) {
      throw new HttpException('None user with this nickname was found', HttpStatus.BAD_REQUEST)
    }

    return users
  }

  async getUserDetails(access_token: string) {
    const { id } = await this.authService.decodeToken(access_token)

    const user = await this.userRepository.getDetails(id)

    return user

  }

  async update(updateUserDto: UpdateUserDto) {
    const { access_token, email, nickname, password, new_password } = updateUserDto

    const { id } = await this.authService.decodeToken(access_token)

    const user = await this.userRepository.getDetails(id)

    console.log(password, new_password, user.password)

    await this.authService.verifyPassword(password, user.password)

    let updated_user: Partial<User> = {
      id,
    }

    for (const prop in updateUserDto) {
      if (prop === 'new_password') {
        updated_user['password'] = await this.authService.hashPassword(updateUserDto['new_password'])
      }
      else if (updateUserDto[prop] !== user[prop] && prop !== 'access_token' && prop !== 'new_password') {
        updated_user[prop] = updateUserDto[prop]
      }
    }

    if (updated_user.movies) {
      await this.verifyThereIsNoUserWithEmail(email)
    }

    if (updated_user.nickname) {
      await this.verifyThereIsNoUserWithNickname(nickname)
    }

    if (Object.keys(updated_user).length < 2) {
      throw new HttpException('None change was requested', HttpStatus.BAD_REQUEST)
    }

    await this.userRepository.update(updated_user)

    return await this.userRepository.getDetails(id)
  }

  async remove({ access_token, password }: DeleteUserDTO) {
    const { id } = await this.authService.decodeToken(access_token)

    const user = await this.userRepository.findOneById(id)

    await this.authService.verifyPassword(password, user.password)

    await this.userRepository.delete(user.id)

    return
  }
}
