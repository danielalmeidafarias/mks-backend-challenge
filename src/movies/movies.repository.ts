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

    async getAll() { }

    async getOne() { }

    async search() { }
}   