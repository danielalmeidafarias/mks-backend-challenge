import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsJWT, IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ type: "jwt_token" })
    @IsJWT()
    access_token: string

    @ApiPropertyOptional()
    @IsEmail()
    @IsOptional()
    email?: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    nickname?: string

    @ApiPropertyOptional()
    @IsStrongPassword()
    @IsOptional()
    new_password?: string

    @ApiProperty({type: "string(current password)"})
    @IsString()
    password?: string
}
