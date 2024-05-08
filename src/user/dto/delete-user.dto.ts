import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsJWT, IsString } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

export class DeleteUserDTO {
    @ApiProperty()
    @IsJWT()
    access_token: string
    
    @ApiProperty()
    @IsString()
    password: string
}
