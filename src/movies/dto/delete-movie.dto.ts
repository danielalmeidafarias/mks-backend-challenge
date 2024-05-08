import { ApiProperty } from "@nestjs/swagger";
import { IsJWT, IsString } from "class-validator";

export class DeleteMovieBodyDTO {
    @ApiProperty({ example: 'jwt_token' })
    @IsJWT()
    access_token: string
}

export class DeleteMovieParamDTO {
    @ApiProperty()
    @IsString()
    movie_id: string
}