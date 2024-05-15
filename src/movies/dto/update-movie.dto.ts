import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { IsArray, IsDateString, IsIn, IsJWT, IsNumberString, IsString, IsUUID, MaxLength, Validate, ValidateNested } from 'class-validator';
import { IsCountryCode } from './decorators/isCountryCode';
import { IsLanguageCode } from './decorators/isLanguageCode';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMovieBodyDTO extends PartialType(CreateMovieDto) {
    @ApiProperty({ example: 'jwt_token' })
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

    @ApiPropertyOptional({ type: "string(ISO 639-1)" })
    @Validate(IsLanguageCode)
    language_code: string

    @ApiPropertyOptional({ type: "string(ISO 639-1)" })
    @Validate(IsLanguageCode)
    original_language_code: string

    @ApiPropertyOptional({ type: "string(ISO 3166-1 alpha-2)" })
    @Validate(IsCountryCode)
    country_code: string

    @ApiPropertyOptional()
    @IsNumberString()
    duration_in_minutes: string

    @ApiPropertyOptional({ type: 'string(y/m/d)' })
    @IsDateString()
    release_date: string

    @ApiPropertyOptional()
    @IsArray()
    @IsString({ each: true })
    genre: string[]

    @ApiPropertyOptional({ type: `G | PG | PG-13 | R | NC-17` })
    @IsIn(['G', 'PG', 'PG-13', 'R', 'NC-17'])
    rating: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17'
}

export class UpdateMovieParamDTO {
    @ApiProperty({ type: 'uuid' })
    @IsUUID()
    movie_id: string
}