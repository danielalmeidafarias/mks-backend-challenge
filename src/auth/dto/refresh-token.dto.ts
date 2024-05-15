import { ApiProperty } from "@nestjs/swagger";
import { IsJWT } from "class-validator";

export class RefreshTokenDto {
    @ApiProperty({ example: 'jwt_token' })
    @IsJWT()
    refresh_token: string
}