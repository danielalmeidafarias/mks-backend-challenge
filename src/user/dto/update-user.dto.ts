import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsJWT, IsOptional, IsStrongPassword } from 'class-validator';

export class UpdateUserDto {
    @IsJWT()
    access_token: string
    
    @IsEmail()
    @IsOptional()
    email?: string

    @IsStrongPassword()
    @IsOptional()
    password?: string
}
