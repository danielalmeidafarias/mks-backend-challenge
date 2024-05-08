import { Module, forwardRef } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { MoviesRepository } from './movies.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), AuthModule, forwardRef(() => UserModule) ],
  controllers: [MoviesController],
  exports: [MoviesService, MoviesRepository],
  providers: [MoviesService, MoviesRepository,JwtService]
})
export class MoviesModule {}
