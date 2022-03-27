import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { FormationService } from './formation.service';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors';

@Controller('formations')
export class FormationController {
  constructor(private readonly formationService: FormationService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body() createFormationDto: { data: string },
    @UploadedFiles() images?: Array<Express.Multer.File>,
  ) {
    const data = JSON.parse(createFormationDto.data);
    return this.formationService.create(data, images);
  }

  @Get('ecole/:input')
  findByEcole(@Param('input') input: string) {
    return this.formationService.findByEcole(input);
  }

  @Get()
  findAll() {
    return this.formationService.findAll();
  }

  @Get('top')
  topFormations() {
    return this.formationService.topFormations();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formationService.findOne(id);
  }

  @Put('updateState/:id')
  updateState(@Param('id') id: string) {
    return this.formationService.updateState(id);
  }

  @Put('updateTop/:id')
  updateTop(@Param('id') id: string) {
    return this.formationService.updateTop(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFormationDto: UpdateFormationDto,
  ) {
    return this.formationService.update(+id, updateFormationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formationService.remove(+id);
  }
}
