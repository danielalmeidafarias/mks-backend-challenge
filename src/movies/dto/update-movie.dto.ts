import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { IsArray, IsDateString, IsIn, IsNumberString, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
    @IsString()
    @MaxLength(50)
    title: string

    @IsString()
    @MaxLength(400)
    original_title: string

    @IsString()
    language: string

    @IsString()
    original_language: string

    @IsNumberString()
    duration_in_minutes: string

    @IsDateString()
    release_date: string
    
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => String)
    genre: string[]

    @IsIn(['G', 'PG', 'PG-13', 'R', 'NC-17'])
    rating: string
}
