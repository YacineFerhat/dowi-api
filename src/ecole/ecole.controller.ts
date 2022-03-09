import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EcoleService } from './ecole.service';
import { CreateEcoleDto } from './dto/create-ecole.dto';
import { UpdateEcoleDto } from './dto/update-ecole.dto';
import { validateEcoleDto } from './dto/validate-ecole.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';

@Controller('ecoles')
export class EcoleController {
  constructor(private readonly ecoleService: EcoleService) {}

  @Post()
  create(@Body() createEcoleDto: CreateEcoleDto) {
    return this.ecoleService.create(createEcoleDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    this.ecoleService.upload(file);
  }

  @Get()
  findAll() {
    return this.ecoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ecoleService.findOne(id);
  }

  @Get('alias/:alias')
  findByAlias(@Param('alias') alias: string) {
    return this.ecoleService.findByAlias(alias);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEcoleDto: UpdateEcoleDto) {
    return this.ecoleService.update(+id, updateEcoleDto);
  }

  @Put('validate')
  validate(@Body() input: validateEcoleDto) {
    return this.ecoleService.validate(input);
  }

  @Put('updateState/:id')
  updateState(@Param('id') id: string) {
    return this.ecoleService.updateState(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ecoleService.remove(id);
  }
}
