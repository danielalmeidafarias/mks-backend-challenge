import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { DeleteMovieDTO } from './dto/delete-movie.dto';
import { SearchMovieDTO } from './dto/search-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(@Inject(MoviesService) private readonly moviesService: MoviesService) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return await this.moviesService.create(createMovieDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async search(@Body() { access_token }: Pick<SearchMovieDTO, 'access_token'>, @Query() moviesFilter: Omit<SearchMovieDTO, 'access_token'>) {
    return this.moviesService.search(moviesFilter);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string, @Body() access_token: string) {
    return this.moviesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id', new ParseUUIDPipe()) movie_id: string, @Body() updateMovieBody: Omit<UpdateMovieDto, 'movie_id'>) {
    return this.moviesService.update(movie_id, updateMovieBody);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) movie_id: string, @Body() { access_token }: Pick<DeleteMovieDTO, 'access_token'>) {
    return this.moviesService.remove(movie_id, access_token);
  }
}
