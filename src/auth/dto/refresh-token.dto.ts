import { ApiProperty } from "@nestjs/swagger";
import { IsJWT } from "class-validator";

export class RefreshTokenDto {
    @ApiProperty({ type: 'jwt_token' })
    @IsJWT()
    refresh_token: string
}