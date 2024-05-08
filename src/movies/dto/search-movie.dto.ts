import { IsIn, IsJWT, IsString, IsUUID, Validate } from "class-validator"
import { IsCountryCode } from "./decorators/isCountryCode"
import { IsLanguageCode } from "./decorators/isLanguageCode"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class SearchMovieBodyDTO {
    @ApiProperty({ type: 'jwt_token' })
    @IsJWT()
    access_token: string
}

export class SearchMovieQueryDTO {
    @ApiPropertyOptional({ type: 'uuid' })
    @IsUUID()
    user_id: string

    @ApiPropertyOptional({ type: "string(ISO 3166-1 alpha-2)"})
    @Validate(IsCountryCode)
    country_code: string

    @ApiPropertyOptional()
    @IsString()
    genre: string

    @ApiPropertyOptional({ type: "string(ISO 639-1)" })
    @Validate(IsLanguageCode)
    language_code: string

    @ApiPropertyOptional({ type: `G | PG | PG-13 | R | NC-17` })
    @IsIn(['G', 'PG', 'PG-13', 'R', 'NC-17'])
    rating: "G" | "PG" | "PG-13" | "R" | "NC-17"

    @ApiPropertyOptional()
    @IsString()
    title: string
}