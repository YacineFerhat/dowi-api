import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AffichesService } from './affiches.service';
import { CreateAffichDto } from './dto/create-affiche.dto';
import { UpdateAffichDto } from './dto/update-affich.dto';

@Controller('affiches')
export class AffichesController {
  constructor(private readonly affichesService: AffichesService) {}

  @Post()
  create(@Body() createAffichDto: CreateAffichDto) {
    return this.affichesService.create(createAffichDto);
  }

  @Get()
  findAll() {
    return this.affichesService.findAll();
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
