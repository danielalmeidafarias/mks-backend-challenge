import { IsJWT, IsOptional, IsString } from "class-validator"

export class SearchUserDTO {
    @IsJWT()
    access_token: string

    @IsString()
    @IsOptional()
    nickname: string
}