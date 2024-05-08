import { ApiProperty } from "@nestjs/swagger";
import { IsJWT } from "class-validator";

export class GetUserDetailsDTO {
    @ApiProperty()
    @IsJWT()
    access_token: string
}