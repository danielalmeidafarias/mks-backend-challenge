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
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiOperation, ApiParam, ApiProperty, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse, PickType } from '@nestjs/swagger';
import { GetUserBodyDTO } from './dto/get-user.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post()
  @ApiOperation({ summary: 'creating a new account' })
  @ApiResponse({
    status: 201,
    description: 'Account has ben created!',
    schema: {
      example: {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZjNjNlZTM4LWM2ODktNGJlNi05NmI5LWFiMmZlYzRkZjNiMSIsImVtYWlsIjoiZGFuaWVsYWxtZWlkYWZhcmlhcy5kZXYyQGdtYWlsLmNvbSIsImlhdCI6MTcxNTE5NzQ2NSwiZXhwIjoxNzE1MjAxMDY1fQ.A3eUmvfVDTtEl8hISEUxK6Eb6fMJ6evoZuUFOfKgZnA",
        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZjNjNlZTM4LWM2ODktNGJlNi05NmI5LWFiMmZlYzRkZjNiMSIsImVtYWlsIjoiZGFuaWVsYWxtZWlkYWZhcmlhcy5kZXYyQGdtYWlsLmNvbSIsImlhdCI6MTcxNTE5NzQ2NSwiZXhwIjoxNzE1MjgzODY1fQ.f7pJZ-_fLdECwPdc6bjTSTj_Gg36JuDzfE70DVjUfEk"
      }
    }
  })
  @ApiBadRequestResponse({
    status: 400, description: 'Missing something or data in a wrong type', schema: {
      example: {
        "message": [
          "password is not strong enough"
        ],
        "error": "Bad Request",
        "statusCode": 400
      }
    }
  })
  @ApiConflictResponse({
    status: 400, description: 'There is an user with this email already!', schema: {
      example: {
        "statusCode": 409,
        "message": "There is an user with this email already"
      }
    }
  })
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const { refresh_token } = await this.userService.create(createUserDto)
    res.status(302).redirect(`/auth/get-token/?refresh_token=${refresh_token}`)
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: `searching for users and it's movies` })
  @ApiResponse({
    status: 200,
    schema: {
      example: [
        {
          "id": "6c63ee38-c689-4be6-96b9-ab2fec4df3b1",
          "nickname": "daniel1"
        },
        {
          "id": "4dea20d9-bd09-471c-b72f-ab196418e730",
          "nickname": "daniel"
        }
      ]
    }
  })
  @ApiBadRequestResponse({
    schema: {
      example: {
        "statusCode": 400,
        "message": "None user with this nickname was found"
      }
    }
  })
  @ApiUnauthorizedResponse({
    description: 'invalid or expired access_token', schema: {
      example: {
        "message": "Unauthorized",
        "statusCode": 401
      }
    }
  })
  @Get()
  @UseInterceptors(CacheInterceptor)
  search(@Body() { access_token }: SearchUserBodyDTO, @Query() { nickname }: SearchUserQueryDTO) {
    return this.userService.findAll(nickname);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: `getting your own account info` })
  @UseInterceptors(CacheInterceptor)
  @ApiUnauthorizedResponse({ description: 'invalid or expired access_token' })
  @ApiResponse({
    schema: {
      example: {
        "id": "4dea20d9-bd09-471c-b72f-ab196418e730",
        "nickname": "daniel",
        "email": "danielalmeidafarias.dev@gmail.com",
        "password": "$2b$10$EZ8wec/muOoMfn6daHXnAeTSvnZKmZOCrmUjfyMyvj.v5mQENvV4.",
        "created_at": "2024-05-08T20:30:10.969Z",
        "updated_at": "2024-05-08T22:52:02.228Z"
      }
    }
  })
  @Get('/details')
  getDetails(@Body() { access_token }: GetUserDetailsDTO) {
    return this.userService.getUserDetails(access_token);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: `find some account with it's id` })
  @UseInterceptors(CacheInterceptor)
  @ApiUnauthorizedResponse({
    description: 'invalid/expired access_token', schema: {
      example:
      {
        "message": "Unauthorized",
        "statusCode": 401
      }

    }
  })
  @ApiBadRequestResponse({
    schema: {
      example: {
        "statusCode": 400,
        "message": "None user with this id was found"
      }
    }
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        "user": {
          "id": "4dea20d9-bd09-471c-b72f-ab196418e730",
          "nickname": "daniel"
        },
        "users_movies": [
          {
            "id": "b4028dab-2182-409e-8403-966bb832789c",
            "user_id": "4dea20d9-bd09-471c-b72f-ab196418e730",
            "title": "Minha mãe é uma peça",
            "synopsis": "Dona Hermínia é uma senhora de meia-idade, divorciada do marido, que a trocou por uma mulher mais jovem. Hiperativa, ela não larga o pé de seus filhos Marcelina e Juliano. Um dia, após descobrir que eles a consideram chata, ela resolve sair de casa sem avisar ninguém, deixando todos preocupados. Dona Hermínia decide visitar a querida tia Zélia para desabafar suas tristezas atuais e recordar os bons tempos do passado.",
            "original_title": "Minha mãe é uma peça",
            "language_code": "pt",
            "original_language_code": "pt",
            "country_code": "BR",
            "duration_in_minutes": "144",
            "release_date": "2013-06-21",
            "genre": [
              "comédia",
              "drama"
            ],
            "rating": "PG",
            "created_at": "2024-05-08T23:00:48.196Z",
            "updated_at": "2024-05-08T23:00:48.196Z"
          }
        ]
      }
    }
  })
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string, @Body() { access_token }: GetUserBodyDTO) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: `update account info` })
  @ApiUnauthorizedResponse({
    description: 'invalid/expired access_token or wrong password', schema: {
      example:
      {
        "message": "Unauthorized",
        "statusCode": 401
      }

    }
  })
  @ApiResponse({
    description: `User's info updated!`,
    status: 200,
    schema: {
      example: {
        "id": "4dea20d9-bd09-471c-b72f-ab196418e730",
        "nickname": "daniel",
        "email": "danielalmeidafarias.dev@gmail.com",
        "password": "$2b$10$EZ8wec/muOoMfn6daHXnAeTSvnZKmZOCrmUjfyMyvj.v5mQENvV4.",
        "created_at": "2024-05-08T20:30:10.969Z",
        "updated_at": "2024-05-08T22:52:02.228Z"
      }
    }
  })
  @ApiBadRequestResponse({
    schema: {
      example: {
        "statusCode": 400,
        "message": "None change was requested"
      }
    }
  })
  @ApiUnprocessableEntityResponse({
    status: 400, description: 'Missing something or data in a wrong type', schema: {
      example: {
        "message": [
          "nickname must be a string"
        ],
        "error": "Bad Request",
        "statusCode": 400
      }
    }
  })
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: `delete account` })
  @ApiUnauthorizedResponse({
    description: 'invalid/expired access_token or wrong password', schema: {
      example:
      {
        "message": "Unauthorized",
        "statusCode": 401
      }

    }
  })
  @ApiUnprocessableEntityResponse({
    status: 400, description: 'Missing something or data in a wrong type', schema: {
      example: {
        "message": [
          "password must be a string"
        ],
        "error": "Bad Request",
        "statusCode": 400
      }
    }
  })
  @ApiResponse({
    schema: {
      example: {
        "message": "Account deleted with success!"
      }
    }
  })
  @Delete()
  remove(@Body() deleteUserDTO: DeleteUserDTO) {
    return this.userService.remove(deleteUserDTO);
  }
}
