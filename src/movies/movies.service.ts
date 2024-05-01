import { Inject, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Repository } from 'typeorm';
import { Movie, MovieEntity } from './entities/movie.entity';
import { MoviesRepository } from './movies.repository';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class MoviesService {
  constructor(
    @Inject(MoviesRepository) private movieRepository: MoviesRepository,
    @Inject(AuthService) private authService: AuthService,
  ) { }

  async create(createMovieDto: CreateMovieDto) {
    const { access_token, title, original_title, language, original_language, duration_in_minutes, genre, rating, release_date, synopsis } = createMovieDto

    const { id: user_id } = await this.authService.decodeToken(access_token)

    const { id } = (await this.movieRepository.create(new Movie(
      {
        duration_in_minutes,
        genre, language,
        original_language,
        original_title, rating,
        release_date,
        synopsis,
        title,
        user_id
        }
    ))).identifiers[0]

    return id;
  }

  findAll() {
    return `This action returns all movies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
