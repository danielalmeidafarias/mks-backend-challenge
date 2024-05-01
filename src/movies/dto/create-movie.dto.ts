import { Type } from "class-transformer";
import { IsArray, IsDateString, IsIBAN, IsIn, IsJWT, IsNumberString, IsString, MaxLength, ValidateNested } from "class-validator";

export class CreateMovieDto {
    @IsJWT()
    access_token: string

    @IsString()
    title: string

    @IsString()
    @MaxLength(400)
    synopsis: string

    @IsString()
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
    @ValidateNested({ each: true })
    @Type(() => String)
    genre: string[]

    @IsIn(['G', 'PG', 'PG-13', 'R', 'NC-17'])
    rating: "G" | "PG" | "PG-13" | "R" | "NC-17"
}
