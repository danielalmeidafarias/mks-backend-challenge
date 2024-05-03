import { HttpException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Repository } from 'typeorm';
import { Movie, MovieEntity } from './entities/movie.entity';
import { MoviesRepository } from './movies.repository';
import { AuthService } from 'src/auth/auth.service';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class MoviesService {
  constructor(
    @Inject(MoviesRepository) private movieRepository: MoviesRepository,
    @Inject(AuthService) private authService: AuthService,
    @Inject(UserRepository) private userRepository: UserRepository
  ) { }

  async create(createMovieDto: CreateMovieDto) {
    const { access_token, title, original_title, language, original_language, duration_in_minutes, genre, rating, release_date, synopsis } = createMovieDto

    const { id: user_id } = await this.authService.decodeToken(access_token)
    const user = await this.userRepository.findOneById(user_id)

    if (!user) {
      throw new UnauthorizedException()
    }

    const { id } = (await this.movieRepository.create(new Movie(
      {
        duration_in_minutes,
        genre, language,
        original_language,
        original_title, rating,
        release_date,
        synopsis,
        title,
        user
      }
    ))).identifiers[0]

    return id;
  }

  async findAll() {
    return await this.movieRepository.getAll()
  }

  async findOne(id: string) {
    return await this.movieRepository.getOne(id)
  }

  async findUsersMovies(user_id: string) {

  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  async remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
