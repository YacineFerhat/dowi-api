import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Auth } from './entities/auth.entity';
import { Model, ObjectId } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private authModel: Model<Auth>,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  reset = async (input: any) => {
    const { password, id, confirmPassword } = input;
    if (password === confirmPassword) {
      await this.authModel.findOneAndUpdate(
        { _id: id },
        { password: await bcrypt.hash(password, 10) },
      );
      return true;
    }
    return false;
  };

  async create(createAuthDto: CreateAuthDto) {
    const { email, grade } = createAuthDto;
    const userFound = await this.checkEmail(createAuthDto.email);
    if (userFound) return "L'adresse Email est déjà attribuée";
    const password =
      createAuthDto.password !== ''
        ? createAuthDto.password
        : Math.random().toString(36).substr(2, 6);
    const alias = Math.random().toString(36).substr(2, 10);
    const auth = new this.authModel({
      email,
      grade,
      alias,
      password: await bcrypt.hash(password, 10),
    });
    auth.save();
    if (grade === 'ecole')
      await this.mailService.ecoleCreation(
        createAuthDto.name,
        email,
        password,
        alias,
      );
    if (grade === 'student') await this.mailService.studentCreation(email);
    if (
      grade === 'admin' ||
      grade === 'sale' ||
      grade === 'marketing supervisor' ||
      grade === 'sale supervisor' ||
      grade === 'super admin'
    )
      await this.mailService.adminCreation(email, password);
    const id = auth._id;
    const token = this.jwtService.sign(
      { email, grade, alias, createdAt: new Date().getTime(), id },
      { expiresIn: '1d' },
    );
    return { ...auth, id, token, alias };
  }

  login = async (input: LoginAuthDto) => {
    const { email, password } = input;
    const auth = await this.findByEmail(email);
    if (auth && (await bcrypt.compare(password, auth.password))) {
      const { email, grade, alias } = auth.toObject();
      const id = auth._id;
      const token = this.jwtService.sign(
        {
          id,
          email,
          alias,
          grade,
          createdAt: new Date().getTime(),
        },
        { expiresIn: '1d' },
      );
      console.log(token);
      return token;
    }
    return undefined;
  };

  checkEmail = async (email: string) => {
    return await this.authModel.findOne({ email: email });
  };

  async findByAlias(alias: string) {
    return await this.authModel.findOne({ alias: alias }).select('email grade');
  }

  findByEmail = async (email: string) => {
    return await this.authModel.findOne({ email: email });
  };

  findAndDelete = async (id: string) => {
    return await this.authModel.deleteOne({ _id: id });
  };

  findAll() {
    return `This action returns all auth`;
  }

  findOne = async (id: string) => {
    return await this.authModel.findOne({ _id: id });
  };

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
