import { DataSource, Repository } from "typeorm";
import { Movie } from "./entities/movie.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class MoviesRepository {
    constructor(private dataSource: DataSource) { }

    async create(movie: Movie) {

    }

    async update() { }

    async delete() { }

    async getAll() { }

    async getOne() { }

    async search() { }
}   