import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { IsArray, IsDateString, IsIn, IsJWT, IsNumberString, IsString, IsUUID, MaxLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
    @IsJWT()
    access_token: string

    @IsUUID()
    movie_id: string

    @IsString()
    @MaxLength(50)
    title: string

    @IsString()
    @MaxLength(400)
    original_title: string

    @IsString()
    @MaxLength(400)
    synopsis: string

    @IsString()
    language: string

    @IsString()
    original_language: string

    @IsNumberString()
    duration_in_minutes: string

    @IsDateString()
    release_date: string

    @IsArray()
    @IsString({each: true})
    genre: string[]

    @IsIn(['G', 'PG', 'PG-13', 'R', 'NC-17'])
    rating: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17'
}