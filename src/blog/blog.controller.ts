import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors';
import { Request } from 'express';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('image'))
  async create(
    @Body() createFormationDto: { data: string },
    @UploadedFiles() images?: Array<Express.Multer.File>,
  ) {
    const data = JSON.parse(createFormationDto.data);
    return this.blogService.create(data, images);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get('recent')
  getRecentBlogs() {
    return this.blogService.getRecentBlogs();
  }

  @Get('search/:input')
  filterBlog(@Param('input') input: string) {
    return this.blogService.filterBlog(JSON.parse(input));
  }

  @Get('title/:name')
  getByName(@Param('name') name: string) {
    return this.blogService.getByName(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Put('updateState/:id')
  updateState(@Param('id') id: string) {
    return this.blogService.updateState(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
