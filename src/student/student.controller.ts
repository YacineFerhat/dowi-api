import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Post('contactUs')
  contactUs(@Body() input: any) {
    return this.studentService.contactUs(input);
  }

  @Post('commander')
  commander(@Body() input: any) {
    return this.studentService.commander(input);
  }

  @Post('contactSchool')
  contactSchool(@Body() input: any) {
    return this.studentService.contactSchool(input);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Get('/alias/:alias')
  findByAlias(@Param('alias') alias: string) {
    return this.studentService.findByAlias(alias);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Put('/ban/:id')
  ban(@Param('id') id: string) {
    return this.studentService.ban(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
