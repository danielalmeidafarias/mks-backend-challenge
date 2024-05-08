import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Inject, ParseUUIDPipe, Query, UseInterceptors } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieBodyDTO } from './dto/update-movie.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { DeleteMovieBodyDTO } from './dto/delete-movie.dto';
import { SearchMovieBodyDTO, SearchMovieQueryDTO } from './dto/search-movie.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { GetMovieBodyDTO } from './dto/get-movie.dto';

@Controller('movies')
@ApiTags('Movies')
export class MoviesController {
  constructor(@Inject(MoviesService) private readonly moviesService: MoviesService) { }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'adding a new movie' })
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
    status: 422, description: 'Missing something or data in a wrong type', schema: {
      example: {
        "message": [
          "country_code must the an valid ISO 3166-1 alpha-2 country code"
        ],
        "error": "Bad Request",
        "statusCode": 400
      }
    }
  })
  @ApiOkResponse({
    description: 'Movie created with success!',
    schema: {
      example: {
        "id": "ef03ad6e-30e3-460b-aa8b-d0d632e56fc2",
        "user_id": "8b20e1c1-8be4-40be-b733-6bc2bc525fbc",
        "title": "Carandiru: O Filme",
        "synopsis": "Médico sanitarista se oferece para realizar o trabalho de prevenção ao vírus HIV no Carandiru, maior presídio da América Latina, durante a década de 1990. Convivendo diariamente com a dura realidade dos detentos, ele presencia a violência agravada pela superlotação, a precariedade dos serviços prestados e a animalização dos presos. Paradoxalmente, ele conhece o sistema de organização interna e o lado frágil, romântico e sonhador dos homens cumprindo pena.",
        "original_title": "Carandiru: O Filme",
        "language_code": "pt",
        "original_language_code": "pt",
        "country_code": "BR",
        "duration_in_minutes": "245",
        "release_date": "2003-04-11",
        "genre": [
          "crime",
          "drama"
        ],
        "rating": "R",
        "created_at": "2024-05-09T00:12:28.534Z",
        "updated_at": "2024-05-09T00:12:28.534Z"
      }
    }
  })
  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return await this.moviesService.create(createMovieDto);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'searching for a movie' })
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
    status: 400, description: 'Missing something or data in a wrong type', schema: {
      example: {
        "message": [
          "rating must be one of the following values: G, PG, PG-13, R, NC-17"
        ],
        "error": "Bad Request",
        "statusCode": 400
      }
    }
  })
  @ApiOkResponse({
    schema: {
      example: [
        {
          "id": "ef03ad6e-30e3-460b-aa8b-d0d632e56fc2",
          "user_id": "8b20e1c1-8be4-40be-b733-6bc2bc525fbc",
          "title": "Carandiru: O Filme",
          "synopsis": "Médico sanitarista se oferece para realizar o trabalho de prevenção ao vírus HIV no Carandiru, maior presídio da América Latina, durante a década de 1990. Convivendo diariamente com a dura realidade dos detentos, ele presencia a violência agravada pela superlotação, a precariedade dos serviços prestados e a animalização dos presos. Paradoxalmente, ele conhece o sistema de organização interna e o lado frágil, romântico e sonhador dos homens cumprindo pena.",
          "original_title": "Carandiru: O Filme",
          "language_code": "pt",
          "original_language_code": "pt",
          "country_code": "BR",
          "duration_in_minutes": "245",
          "release_date": "2003-04-11",
          "genre": [
            "crime",
            "drama"
          ],
          "rating": "R",
          "created_at": "2024-05-09T00:12:28.534Z",
          "updated_at": "2024-05-09T00:12:28.534Z"
        },
        {
          "id": "4cc316e0-3712-4eba-bc28-240b0dc582ac",
          "user_id": "8b20e1c1-8be4-40be-b733-6bc2bc525fbc",
          "title": "Tropa de Elite",
          "synopsis": "Nascimento, capitão da Tropa de Elite do Rio de Janeiro, é designado para chefiar uma das equipes que tem como missão apaziguar o Morro do Turano. Ele precisa cumprir as ordens enquanto procura por um substituto para ficar em seu lugar. Em meio a um tiroteio, Nascimento e sua equipe resgatam Neto e Matias, dois aspirantes a oficiais da PM.",
          "original_title": "Tropa de Elite",
          "language_code": "pt",
          "original_language_code": "pt",
          "country_code": "BR",
          "duration_in_minutes": "115",
          "release_date": "2007-10-05",
          "genre": [
            "ação",
            "guerra",
            "brasileiro"
          ],
          "rating": "R",
          "created_at": "2024-05-09T00:42:47.533Z",
          "updated_at": "2024-05-09T00:42:47.533Z"
        }
      ]
    }
  })
  @Get()
  async search(@Body() { access_token }: SearchMovieBodyDTO, @Query() moviesFilter: SearchMovieQueryDTO) {
    return this.moviesService.search(moviesFilter);
  }

  @UseGuards(AuthGuard)
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
        "message": "movie_id does not correspond to any movie"
      }
    }
  })
  @ApiOkResponse({
    status: 200, schema: {
      example: {
        "id": "ef03ad6e-30e3-460b-aa8b-d0d632e56fc2",
        "user_id": "8b20e1c1-8be4-40be-b733-6bc2bc525fbc",
        "title": "Carandiru: O Filme",
        "synopsis": "Médico sanitarista se oferece para realizar o trabalho de prevenção ao vírus HIV no Carandiru, maior presídio da América Latina, durante a década de 1990. Convivendo diariamente com a dura realidade dos detentos, ele presencia a violência agravada pela superlotação, a precariedade dos serviços prestados e a animalização dos presos. Paradoxalmente, ele conhece o sistema de organização interna e o lado frágil, romântico e sonhador dos homens cumprindo pena.",
        "original_title": "Carandiru: O Filme",
        "language_code": "pt",
        "original_language_code": "pt",
        "country_code": "BR",
        "duration_in_minutes": "245",
        "release_date": "2003-04-11",
        "genre": [
          "crime",
          "drama"
        ],
        "rating": "R",
        "created_at": "2024-05-09T00:12:28.534Z",
        "updated_at": "2024-05-09T00:12:28.534Z"
      }
    }
  })
  @ApiOperation({ summary: `getting some movie with it's id` })
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string, @Body() { access_token }: GetMovieBodyDTO) {
    return this.moviesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'updating a movie' })
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
        "message": "movie_id does not correspond to any movie"
      }
    }
  })
  @ApiOkResponse({
    status: 200,
    schema: {
      example: {
        "id": "62b961f8-22a9-4f84-b4dd-51e4322a54e6",
        "user_id": "8b20e1c1-8be4-40be-b733-6bc2bc525fbc",
        "title": "Elite Squad",
        "synopsis": "Elite Squad is a 2007 Brazilian crime film based on the novel Elite da Tropa by Luiz Eduardo Soares, André Batista, and Rodrigo Pimentel. Directed by José Padilha (from a screenplay by Padilha, Bráulio Mantovani, and Pimentel), the film stars Wagner Moura, Caio Junqueira, and André Ramiro, and tells the story of Roberto Nascimento (Moura), a captain with the Batalhão de Operações Policiais Especiais, or BOPE (special police operations battalion), who leads a police crackdown on a series of Rio de Janeiro favelas in-preparation for the Brazilian state visit of Pope John Paul II.",
        "original_title": "Tropa de Elite",
        "language_code": "en",
        "original_language_code": "pt",
        "country_code": "BR",
        "duration_in_minutes": "115",
        "release_date": "2007-10-05",
        "genre": [
          "ação",
          "guerra",
          "brasileiro"
        ],
        "rating": "R",
        "created_at": "2024-05-09T00:30:41.893Z",
        "updated_at": "2024-05-09T00:30:56.712Z"
      }
    }
  })
  @ApiUnprocessableEntityResponse({
    schema: {
      example: {
        "statusCode": 400,
        "message": "None change was requested"
      }
    }
  })
  @Patch(':id')
  async update(@Param('id', new ParseUUIDPipe()) movie_id: string, @Body() updateMovieBody: UpdateMovieBodyDTO) {
    return this.moviesService.update(movie_id, updateMovieBody);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'deleting a movie' })
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
        "message": "movie_id does not correspond to any movie"
      }
    }
  })
  @ApiOkResponse({
    schema: {
      example: 'Movie deleted!'
    }
  })
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) movie_id: string, @Body() { access_token }: DeleteMovieBodyDTO) {
    return this.moviesService.remove(movie_id, access_token);
  }
}
