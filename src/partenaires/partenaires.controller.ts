import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PartenairesService } from './partenaires.service';
import { CreatePartenaireDto } from './dto/create-partenaire.dto';
import { UpdatePartenaireDto } from './dto/update-partenaire.dto';

@Controller('partenaires')
export class PartenairesController {
  constructor(private readonly partenairesService: PartenairesService) {}

  @Post()
  create(@Body() createPartenaireDto: CreatePartenaireDto) {
    return this.partenairesService.create(createPartenaireDto);
  }

  @Get()
  findAll() {
    return this.partenairesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partenairesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePartenaireDto: UpdatePartenaireDto,
  ) {
    return this.partenairesService.update(+id, updatePartenaireDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partenairesService.remove(id);
  }
}
