import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Inject, ParseUUIDPipe, Query, UseInterceptors } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieBodyDTO } from './dto/update-movie.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { DeleteMovieBodyDTO } from './dto/delete-movie.dto';
import { SearchMovieBodyDTO, SearchMovieQueryDTO } from './dto/search-movie.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiTags } from '@nestjs/swagger';
import { GetMovieBodyDTO } from './dto/get-movie.dto';

@Controller('movies')
@ApiTags('Movies')
export class MoviesController {
  constructor(@Inject(MoviesService) private readonly moviesService: MoviesService) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return await this.moviesService.create(createMovieDto);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(CacheInterceptor)
  @Get()
  async search(@Body() { access_token }: SearchMovieBodyDTO, @Query() moviesFilter: SearchMovieQueryDTO) {
    console.log('getting from database')
    return this.moviesService.search(moviesFilter);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(CacheInterceptor)
  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string, @Body() { access_token }: GetMovieBodyDTO) {
    return this.moviesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id', new ParseUUIDPipe()) movie_id: string, @Body() updateMovieBody: UpdateMovieBodyDTO) {
    return this.moviesService.update(movie_id, updateMovieBody);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) movie_id: string, @Body() { access_token }: DeleteMovieBodyDTO) {
    return this.moviesService.remove(movie_id, access_token);
  }
}
