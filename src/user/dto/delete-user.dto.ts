import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsJWT, IsString } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

export class DeleteUserDTO {
    @IsJWT()
    access_token: string
    
    @IsString()
    password: string
}
