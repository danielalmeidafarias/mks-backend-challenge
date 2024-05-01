import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { JwtService } from '@nestjs/jwt';
import { databaseConfig } from './database/database.config';
import { MoviesService } from './movies/movies.service';
import { MoviesRepository } from './movies/movies.repository';
import { UserModule } from './user/user.module';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [UserModule, MoviesModule, AuthModule, TypeOrmModule.forRoot(databaseConfig)]
})

export class AppModule { }
