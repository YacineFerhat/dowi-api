import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AffichesService } from './affiches.service';
import { CreateAffichDto } from './dto/create-affiche.dto';
import { UpdateAffichDto } from './dto/update-affich.dto';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors';

@Controller('affiches')
export class AffichesController {
  constructor(private readonly affichesService: AffichesService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('image'))
  async create(
    @Body() createFormationDto: { data: string },
    @UploadedFiles() images?: Array<Express.Multer.File>,
  ) {
    const data = JSON.parse(createFormationDto.data);
    return this.affichesService.create(data, images);
  }

  @Get()
  findAll() {
    return this.affichesService.findAll();
  }

  @Get('front')
  front() {
    return this.affichesService.front();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.affichesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAffichDto: UpdateAffichDto) {
    return this.affichesService.update(+id, updateAffichDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.affichesService.remove(id);
  }
}
