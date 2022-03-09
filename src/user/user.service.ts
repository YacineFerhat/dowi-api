import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MailService } from 'src/mail/mail.service';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private mailService: MailService,
  ) {}

  create = async (createStudentDto: CreateUserDto) => {
    const UserFound = await this.checkEmail(createStudentDto.email);
    if (UserFound) return "L'adresse Email est déjà attribuée";
    createStudentDto.password = await bcrypt.hash(
      Math.random().toString(20).substr(2, 5),
      10,
    );
    const user = new this.userModel(createStudentDto);
    user.save();
    await this.mailService.sendUserConfirmation(user, 'test');
    return 'User créé';
  };

  checkEmail = async (email: string) => {
    return await this.userModel.findOne({ email: email });
  };

  findAll = async () => {
    return await this.userModel.find();
  };
}
