import { DataSource, Repository } from 'typeorm';
import { Movie, MovieEntity } from './entities/movie.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SearchMovieDTO } from './dto/search-movie.dto';

@Injectable()
export class MoviesRepository {
  constructor(private dataSource: DataSource) { }

  async create(movie: Movie) {
    try {
      return await this.dataSource.getRepository(MovieEntity).insert(movie);
    } catch (err) {
      throw new HttpException(
        'An error occurred when creating the movie, please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(movie: Partial<Movie>) {
    try {
      await this.dataSource
        .getRepository(MovieEntity)
        .createQueryBuilder('movies')
        .where('movie.id = :id', { id: movie.id })
        .update(movie)
        .execute(); 
    } catch (err) {
      console.error(err);
      throw new HttpException(
        'An error occured when updating the user, please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(movie_id: string) {
    try {
      return await this.dataSource
        .getRepository(MovieEntity)
        .createQueryBuilder('movie')
        .delete()
        .where('movie.id = :id', { id: movie_id })
        .execute();
    } catch (err) {
      throw new HttpException(
        'An error occurred when deleting the movie, please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOne(movie_id: string) {
    try {
      return (
        (await this.dataSource
          .getRepository(MovieEntity)
          .createQueryBuilder('movie')
          .where('movie.id = :id', { id: movie_id })
          .getOne()) ?? null
      );
    } catch (err) {
      console.error(err);
      throw new HttpException(
        'Something went wrong, please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async search({ user_id, country_code, genre, language_code, rating, title }: Omit<SearchMovieDTO, 'access_token'>) {
    try {
      let functionString = `const moviesPromise = dataSource.getRepository(MovieEntity).createQueryBuilder('movie')`

      if (user_id) {
        functionString = functionString.concat(`.where('movie.user_id = :user_id', { user_id: '${user_id}' })`)
      }
      if (title) {
        functionString = functionString.concat(`.${user_id ? 'andWhere' : 'where'}('title ~* :title', { title: '${title}' })`)
      }
      if (language_code) {
        functionString = functionString.concat(`.${user_id ? 'andWhere' : 'where'}('movie.language_code = :language_code', { language_code: '${language_code}' })`)
      }
      if (country_code) {
        functionString = functionString.concat(`.${user_id ? 'andWhere' : 'where'}('movie.country_code = :country_code', { country_code: '${country_code}' })`)
      }
      if (genre) {
        functionString = functionString.concat(`.${user_id ? 'andWhere' : 'where'}('movie.genre = :genre', { genre: '${genre}' })`)
      }
      if (rating) {
        functionString = functionString.concat(`.${user_id ? 'andWhere' : 'where'}('movie.rating = :rating', { rating: '${rating}' })`)
      }

      const movieSearchPromise = new Function('dataSource','MovieEntity', functionString.concat('.getMany() \n return moviesPromise'))

      return await movieSearchPromise(this.dataSource, MovieEntity)

    } catch (err) {
      console.error(err)
      throw new HttpException('Something went wrong, please try again later', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
