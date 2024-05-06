import { IsIn, IsJWT, IsString, IsUUID, Validate } from "class-validator"
import { IsCountryCode } from "./decorators/isCountryCode"
import { IsLanguageCode } from "./decorators/isLanguageCode"

export class SearchMovieDTO {
    @IsJWT()
    access_token: string

    @IsUUID()
    user_id: string

    @Validate(IsCountryCode)
    country_code: string

    @IsString()
    genre: string

    @Validate(IsLanguageCode)
    language_code: string

    @IsIn(['G', 'PG', 'PG-13', 'R', 'NC-17'])
    rating: "G" | "PG" | "PG-13" | "R" | "NC-17"

    @IsString()
    title: string
}