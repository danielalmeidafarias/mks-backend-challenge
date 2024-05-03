import { IsJWT, IsString } from "class-validator";

export class DeleteMovieDTO {
    @IsJWT()
    access_token: string

    @IsString()
    movie_id: string
}