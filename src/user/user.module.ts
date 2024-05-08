import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, forwardRef(() => MoviesModule)],
  controllers: [UserController],
  providers: [UserRepository, UserService, JwtService],
  exports: [UserService, UserRepository]
})
export class UserModule { }
