import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { IsArray, IsDateString, IsIn, IsJWT, IsNumberString, IsString, IsUUID, MaxLength, Validate, ValidateNested } from 'class-validator';
import { IsCountryCode } from './decorators/isCountryCode';
import { IsLanguageCode } from './decorators/isLanguageCode';

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

    @Validate(IsLanguageCode)
    language_code: string

    @Validate(IsLanguageCode)
    original_language_code: string

    @Validate(IsCountryCode)
    country_code: string

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