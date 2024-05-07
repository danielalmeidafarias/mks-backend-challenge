import { IsJWT } from "class-validator";

export class GetUserDetailsDTO {
    @IsJWT()
    access_token: string
}