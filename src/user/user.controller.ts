import 'dotenv/config';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Res, Req, HttpException, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { DeleteUserDTO } from './dto/delete-user.dto';
import { Request, Response } from 'express';
import { SearchUserDTO } from './dto/search-user.dto';
import { GetUserDetailsDTO } from './dto/get-user-details.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const { refresh_token } = await this.userService.create(createUserDto)
    res.status(302).redirect(`/auth/get-token/?refresh_token=${refresh_token}`)
  }

  @UseGuards(AuthGuard)
  @Get()
  search(@Body() { access_token }: Pick<SearchUserDTO, 'access_token'>, @Query() { nickname }: Pick<SearchUserDTO, 'nickname'>) {
    return this.userService.findAll(nickname);
  }

  @UseGuards(AuthGuard)
  @Get('/details')
  getDetails(@Body() { access_token }: GetUserDetailsDTO) {
    return this.userService.getUserDetails(access_token);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string, @Body() access_token: string) {
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
