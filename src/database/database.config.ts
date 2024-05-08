import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MovieEntity } from 'src/movies/entities/movie.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserEntity, , MovieEntity],
  synchronize: true,
  autoLoadEntities: true,
}
