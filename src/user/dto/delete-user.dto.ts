import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsJWT, IsString } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

export class DeleteUserDTO {
    @ApiProperty({type: 'jwt_token'})
    @IsJWT()
    access_token: string
    
    @ApiProperty({type: "string(current password)"})
    @IsString()
    password: string
}
