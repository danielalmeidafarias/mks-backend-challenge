import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { IsArray, IsDateString, IsIn, IsJWT, IsNumberString, IsString, IsUUID, MaxLength, Validate, ValidateNested } from 'class-validator';
import { IsCountryCode } from './decorators/isCountryCode';
import { IsLanguageCode } from './decorators/isLanguageCode';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMovieBodyDTO extends PartialType(CreateMovieDto) {
    @ApiProperty()
    @IsJWT()
    access_token: string

    @ApiPropertyOptional()
    @IsString()
    @MaxLength(50)
    title: string

    @ApiPropertyOptional()
    @IsString()
    @MaxLength(50)
    original_title: string

    @ApiPropertyOptional()
    @IsString()
    @MaxLength(700)
    synopsis: string

    @ApiPropertyOptional()
    @Validate(IsLanguageCode)
    language_code: string

    @ApiPropertyOptional()
    @Validate(IsLanguageCode)
    original_language_code: string

    @ApiPropertyOptional()
    @Validate(IsCountryCode)
    country_code: string

    @ApiPropertyOptional()
    @IsNumberString()
    duration_in_minutes: string

    @ApiPropertyOptional()
    @IsDateString()
    release_date: string

    @ApiPropertyOptional()
    @IsArray()
    @IsString({each: true})
    genre: string[]

    @ApiPropertyOptional()
    @IsIn(['G', 'PG', 'PG-13', 'R', 'NC-17'])
    rating: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17'
}

export class UpdateMovieParamDTO {
    @ApiProperty()
    @IsUUID()
    movie_id: string
}