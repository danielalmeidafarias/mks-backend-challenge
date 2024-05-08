import { ApiProperty } from "@nestjs/swagger";
import { IsJWT, IsUUID } from "class-validator";

export class GetUserBodyDTO {
    @ApiProperty({example: 'jwt_token'})
    @IsJWT()
    access_token: string
}

export class GetUserParamDTO {
    @ApiProperty({type: 'uuid'})
    @IsUUID()
    id: string
}