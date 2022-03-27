import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { Model, model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MailService } from 'src/mail/mail.service';
import { AuthService } from 'src/auth/auth.service';
import {
  Formation,
  FormationSchema,
} from 'src/formation/entities/formation.entity';
import mongoose from 'mongoose';
import { Auth, AuthSchema } from 'src/auth/entities/auth.entity';
import { FormationService } from 'src/formation/formation.service';
@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<Student>,
    @Inject(forwardRef(() => MailService))
    private mailService: MailService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    @Inject(forwardRef(() => FormationService))
    private formationService: FormationService,
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
    await this.mailService.ecoleContact(
      input.ecoleEmail,
      input.userEmail,
      input.coursName,
    );
    return true;
  };

  contactSchool = async (input: any) => {
    await this.mailService.contactSchool(input.ecoleEmail, input.userEmail);
    return true;
  };

  count = async () => {
    return await this.studentModel.countDocuments();
  };

  commander = async (input: any) => {
    const auth = await this.authService.findOne(input.userId);
    await this.mailService.ecoleCommander(
      input.ecoleEmail,
      input.email,
      input.coursName,
    );
    const student = await this.findByAuthId(input.userId);
    const formations = [...student.formations, input.coursId];
    await this.studentModel.findByIdAndUpdate(
      { _id: student._id },
      { formations: formations },
    );
    return true;
  };

  checkEmail = async (email: string) => {
    return await this.studentModel.findOne({ email: email });
  };

  findByAlias = async (alias: string) => {
    const student = await this.studentModel.findOne({ alias: alias });
    const formations = await this.formationService.findMultiple(
      student.formations,
    );
    const data = { student, formations };
    return data;
  };

  findAll = async () => {
    return await this.studentModel.find();
  };

  findByAuthId = async (authId: string) => {
    return await this.studentModel.findOne({ auth_id: authId });
  };

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  ban = async (id: string) => {
    return await this.studentModel.findOneAndUpdate(
      { _id: id },
      { banned: true },
    );
  };

  remove = async (id: string) => {
    return await this.studentModel.findOneAndDelete({ _id: id });
  };
}
