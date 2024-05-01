import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Movie } from 'src/movies/entities/movie.entity';
import { User } from 'src/user/entities/user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: 'mks_backend_challenge',
  entities: [User, Movie],
  synchronize: true,
  autoLoadEntities: true,
}
