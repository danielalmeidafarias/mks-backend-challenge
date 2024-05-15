import { ApiProperty } from "@nestjs/swagger";
import { IsJWT } from "class-validator";

export class GetUserDetailsDTO {
    @ApiProperty({type: 'jwt_token'})
    @IsJWT()
    access_token: string
}