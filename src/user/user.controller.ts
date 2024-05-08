import 'dotenv/config';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Res, Req, HttpException, HttpStatus, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { DeleteUserDTO } from './dto/delete-user.dto';
import { Request, Response } from 'express';
import { SearchUserBodyDTO, SearchUserQueryDTO } from './dto/search-user.dto';
import { GetUserDetailsDTO } from './dto/get-user-details.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiBadRequestResponse, ApiBody, ApiParam, ApiProperty, ApiQuery, ApiResponse, ApiTags, PickType } from '@nestjs/swagger';
import { GetUserBodyDTO } from './dto/get-user.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const { refresh_token } = await this.userService.create(createUserDto)
    res.status(302).redirect(`/auth/get-token/?refresh_token=${refresh_token}`)
  }

  @UseGuards(AuthGuard)
  @Get()
  @UseInterceptors(CacheInterceptor)
  search(@Body() { access_token }: SearchUserBodyDTO, @Query() { nickname }: SearchUserQueryDTO) {
    return this.userService.findAll(nickname);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(CacheInterceptor)
  @Get('/details')
  getDetails(@Body() { access_token }: GetUserDetailsDTO) {
    return this.userService.getUserDetails(access_token);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(CacheInterceptor)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string, @Body() { access_token }: GetUserBodyDTO) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete()
  remove(@Body() deleteUserDTO: DeleteUserDTO) {
    return this.userService.remove(deleteUserDTO);
  }
}
