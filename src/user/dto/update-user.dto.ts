import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsJWT, IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class UpdateUserDto {
    @IsJWT()
    access_token: string
    
    @IsEmail()
    @IsOptional()
    email?: string

    @IsOptional()
    @IsString()
    nickname?: string

    @IsStrongPassword()
    @IsOptional()
    new_password?: string

    @IsString()
    password?: string
}
