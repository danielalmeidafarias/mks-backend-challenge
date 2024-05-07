import { IsArray, IsDateString, IsIBAN, IsIn, IsJWT, IsNumberString, IsString, MaxLength, Validate, ValidateNested } from "class-validator";
import { IsLanguageCode } from "./decorators/isLanguageCode";
import { IsCountryCode } from "./decorators/isCountryCode";

export class CreateMovieDto {
    @IsJWT()
    access_token: string

    @MaxLength(50)
    @IsString()
    title: string

    @IsString()
    @MaxLength(700)
    synopsis: string

    @MaxLength(50)
    @IsString()
    original_title: string

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
    rating: "G" | "PG" | "PG-13" | "R" | "NC-17"
}
