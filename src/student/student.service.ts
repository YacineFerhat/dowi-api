import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MailService } from 'src/mail/mail.service';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<Student>,
    private mailService: MailService,
    private authService: AuthService,
  ) {}

  create = async (createStudentDto: CreateStudentDto) => {
    const result = await this.authService.create({
      email: createStudentDto.email,
      password: createStudentDto.password,
      grade: 'student',
      name: '',
    });
    if (result !== "L'adresse Email est déjà attribuée") {
      console.log(result.id);
      const student = new this.studentModel({
        ...createStudentDto,
        auth_id: result.id,
        alias: result.alias,
      });
      console.log(student);
      student.save();
      return result.token;
    }
    return "L'adresse Email est déjà attribuée";
  };

  contactUs = async (input: any) => {
    await this.mailService.contactUs(input.email, 'Cours 1');
    return true;
  };

  checkEmail = async (email: string) => {
    return await this.studentModel.findOne({ email: email });
  };

  findByAlias = async (alias: string) => {
    return await this.studentModel.findOne({ alias: alias });
  };

  findAll = async () => {
    return await this.studentModel.find();
  };

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove = async (id: string) => {
    return await this.studentModel.findOneAndDelete({ _id: id });
  };
}
