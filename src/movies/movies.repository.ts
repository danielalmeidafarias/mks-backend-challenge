import { DataSource, Repository } from "typeorm";
import { Movie, MovieEntity } from "./entities/movie.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class MoviesRepository {
    constructor(private dataSource: DataSource) { }

    async create(movie: Movie) {
        try {
            return await this.dataSource.getRepository(MovieEntity).insert(movie)
        } catch (err) {
            throw new HttpException('An error occurred when creating the movie, please try again later', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async update() { }

    async delete() { }

    async getAll() {
        try {
            return await this.dataSource.getRepository(MovieEntity).createQueryBuilder('movies').getMany()
        } catch (err) {
            console.error(err)
            throw new HttpException('Something went wrong, please try again later', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getOne(movie_id: string) {
        try {
            return this.dataSource.getRepository(MovieEntity).createQueryBuilder('movie').where('movie.id = :id', { id: movie_id }).getOne() ?? null
        } catch (err) {
            console.error(err)
            throw new HttpException('Something went wrong, please try again later', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getUsersMovies(userId: string) {
        try {
            return this.dataSource.getRepository(MovieEntity).createQueryBuilder('movie').where('movie.userId = :userId', { userId }).getMany() ?? []
        } catch (err) {
            console.error(err)
            throw new HttpException('Something went wrong, please try again later', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async search() { }
}   