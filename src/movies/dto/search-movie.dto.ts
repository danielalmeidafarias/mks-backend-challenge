import { IsIn, IsJWT, IsString, IsUUID, Validate } from "class-validator"
import { IsCountryCode } from "./decorators/isCountryCode"
import { IsLanguageCode } from "./decorators/isLanguageCode"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class SearchMovieBodyDTO {
    @ApiProperty()
    @IsJWT()
    access_token: string
}

export class SearchMovieQueryDTO {
    @ApiPropertyOptional()
    @IsUUID()
    user_id: string

    @ApiPropertyOptional()
    @Validate(IsCountryCode)
    country_code: string

    @ApiPropertyOptional()
    @IsString()
    genre: string

    @ApiPropertyOptional()
    @Validate(IsLanguageCode)
    language_code: string

    @ApiPropertyOptional()
    @IsIn(['G', 'PG', 'PG-13', 'R', 'NC-17'])
    rating: "G" | "PG" | "PG-13" | "R" | "NC-17"

    @ApiPropertyOptional()
    @IsString()
    title: string
}