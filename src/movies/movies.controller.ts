import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Inject } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(@Inject(MoviesService) private readonly moviesService: MoviesService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return await this.moviesService.create(createMovieDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Body() access_token: string) {
    return this.moviesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Body() access_token: string) {
    return this.moviesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch()
  async update(@Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(updateMovieDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
