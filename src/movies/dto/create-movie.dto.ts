import { IsArray, IsDateString, IsIBAN, IsIn, IsJWT, IsNumberString, IsString, MaxLength, Validate, ValidateNested } from "class-validator";
import { IsLanguageCode } from "./decorators/isLanguageCode";
import { IsCountryCode } from "./decorators/isCountryCode";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMovieDto {
    @ApiProperty()
    @IsJWT()
    access_token: string

    @ApiProperty()
    @MaxLength(50)
    @IsString()
    title: string

    @ApiProperty()
    @IsString()
    @MaxLength(700)
    synopsis: string

    @ApiProperty()
    @MaxLength(50)
    @IsString()
    original_title: string

    @ApiProperty()
    @Validate(IsLanguageCode)
    language_code: string

    @ApiProperty()
    @Validate(IsLanguageCode)
    original_language_code: string

    @ApiProperty()
    @Validate(IsCountryCode)
    country_code: string

    @ApiProperty()
    @IsNumberString()
    duration_in_minutes: string

    @ApiProperty()
    @IsDateString()
    release_date: string

    @ApiProperty()
    @IsArray()
    @IsString({each: true})
    genre: string[]

    @ApiProperty()
    @IsIn(['G', 'PG', 'PG-13', 'R', 'NC-17'])
    rating: "G" | "PG" | "PG-13" | "R" | "NC-17"
}
