import { ApiProperty } from "@nestjs/swagger";
import { IsJWT, IsUUID } from "class-validator";

export class GetUserBodyDTO {
    @ApiProperty()
    @IsJWT()
    access_token: string
}

export class GetUserParamDTO {
    @ApiProperty()
    @IsUUID()
    id: string
}