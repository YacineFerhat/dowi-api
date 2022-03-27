import { Injectable, OnModuleInit } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: Model<Admin>,
    private mailService: MailService,
    private authService: AuthService,
  ) {}

  async onModuleInit() {
    const admin = await this.checkEmail(process.env.MAIL_ADMIN);
    if (admin === null) {
      await this.createSuperAdmin(
        process.env.MAIL_ADMIN,
        process.env.MDP_ADMIN,
      );
    }
  }

  createSuperAdmin = async (email: string, password: string) => {
    const result = await this.authService.create({
      email,
      grade: 'super admin',
      name: 'Lilia',
      password,
    });
    if (result !== "L'adresse Email est déjà attribuée") {
      const admin = new this.adminModel({
        email,
        grade: 'super admin',
        name: 'Lilia',
        auth_id: result.id,
        alias: result.alias,
      });
      admin.save();
      return result.token;
    }
    return "L'adresse Email est déjà attribuée";
  };

  create = async (createAdminDto: CreateAdminDto) => {
    const { email, grade, name } = createAdminDto;
    const result = await this.authService.create({
      email,
      grade,
      name,
      password: '',
    });
    if (result !== "L'adresse Email est déjà attribuée") {
      console.log(createAdminDto);
      const admin = new this.adminModel({
        ...createAdminDto,
        auth_id: result.id,
        alias: result.alias,
      });
      admin.save();
      return result.token;
    }
    return "L'adresse Email est déjà attribuée";
  };

  async findAll() {
    return await this.adminModel.find();
  }

  checkEmail = async (email: string) => {
    return await this.adminModel.findOne({ email: email });
  };

  async findOne(id: string) {
    return await this.adminModel.findOne({ _id: id });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  async remove(id: string) {
    const admin = await this.findOne(id);
    await this.adminModel.findByIdAndDelete(id);
    await this.authService.findAndDelete(admin.auth_id.toString());
  }
}
