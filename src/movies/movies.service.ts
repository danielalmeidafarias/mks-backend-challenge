import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Repository } from 'typeorm';
import { Movie, MovieEntity } from './entities/movie.entity';
import { MoviesRepository } from './movies.repository';
import { AuthService } from 'src/auth/auth.service';
import { UserRepository } from 'src/user/user.repository';
import { PartialType } from '@nestjs/mapped-types';

@Injectable()
export class MoviesService {
  constructor(
    @Inject(MoviesRepository) private movieRepository: MoviesRepository,
    @Inject(AuthService) private authService: AuthService,
    @Inject(UserRepository) private userRepository: UserRepository
  ) { }

  async create(createMovieDto: CreateMovieDto) {
    const { access_token, title, original_title, language_code, original_language_code,country_code, duration_in_minutes, genre, rating, release_date, synopsis } = createMovieDto

    const { id: user_id } = await this.authService.decodeToken(access_token)
    const user = await this.userRepository.findOneById(user_id)

    if (!user) {
      throw new UnauthorizedException()
    }

    const { id } = (await this.movieRepository.create(new Movie(
      {
        duration_in_minutes,
        genre, 
        language_code,
        original_language_code,
        country_code,
        original_title,
        rating,
        release_date,
        synopsis,
        title,
        user,
      }
    ))).identifiers[0]

    return await this.findOne(id);
  }

  async findAll() {
    return await this.movieRepository.getAll()
  }

  async findOne(movie_id: string) {
    return await this.movieRepository.getOne(movie_id)
  }

  async update(movie_id: string, { access_token, duration_in_minutes, genre, language_code, original_language_code, country_code,original_title, rating, release_date, synopsis, title }: Omit<UpdateMovieDto, 'movie_id'>) {

    const { id: user_id } = await this.authService.decodeToken(access_token)

    const user = await this.userRepository.findOneById(user_id)

    const movie = await this.movieRepository.getOne(movie_id)

    if(!movie) {
      throw new HttpException('movie_id does not correspond to any movie', HttpStatus.BAD_REQUEST)
    }

    if (movie.user_id !== user_id) {
      throw new UnauthorizedException()
    }

    const updated_movie = new Movie({
      title: title ? title : movie.title,
      original_title: original_title ? original_title : movie.original_title,
      language_code: language_code ? language_code : movie.language_code,
      original_language_code: original_language_code ? original_language_code : movie.original_language_code,
      country_code: country_code ? country_code : movie.country_code,
      duration_in_minutes: duration_in_minutes ? duration_in_minutes : duration_in_minutes,
      genre: genre ? genre : movie.genre,
      rating: rating ? rating : movie.rating,
      release_date: release_date ? release_date : release_date,
      synopsis: synopsis ? synopsis : movie.synopsis,
      user,
      id: movie.id
    })

    await this.movieRepository.update(updated_movie)

    return await this.movieRepository.getOne(movie_id)

  }

  async remove(movie_id: string, access_token: string) {
    console.log(movie_id)
    const { id: user_id } = await this.authService.decodeToken(access_token)

    const user = await this.userRepository.findOneById(user_id)

    console.log({user})

    const movie = await this.movieRepository.getOne(movie_id)

    console.log({movie})

    console.log({user_id})

    if (!movie || movie.user_id !== user_id) {
      throw new UnauthorizedException()
    }

    await this.movieRepository.delete(movie_id)

    return "Movie deleted!" 
  }
}
