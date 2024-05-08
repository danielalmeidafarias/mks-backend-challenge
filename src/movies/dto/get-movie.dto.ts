import { ApiProperty } from "@nestjs/swagger";
import { IsJWT, IsUUID } from "class-validator";

export class GetMovieBodyDTO {
    @ApiProperty({ example: 'jwt_token' })
    @IsJWT()
    access_token: string
}

export class GetMovieParamDTO {
    @ApiProperty()
    @IsUUID()
    id: string
}