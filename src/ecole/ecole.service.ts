import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEcoleDto } from './dto/create-ecole.dto';
import { UpdateEcoleDto } from './dto/update-ecole.dto';
import { validateEcoleDto } from './dto/validate-ecole.dto';

import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/mail/mail.service';
import { Ecole } from './entities/ecole.entity';

@Injectable()
export class EcoleService {
  constructor(
    @InjectModel(Ecole.name)
    private ecoleModel: Model<Ecole>,
    private mailService: MailService,
    private authService: AuthService,
  ) {}

  create = async (createEcoleDto: CreateEcoleDto) => {
    const result = await this.authService.create({
      email: createEcoleDto.email,
      password: '',
      grade: 'ecole',
      name: createEcoleDto.name,
    });
    if (result !== "L'adresse Email est déjà attribuée") {
      const ecole = new this.ecoleModel({
        ...createEcoleDto,
        auth_id: result._id,
      });
      ecole.save();
      return 'Ecole créé';
    }
    return "L'adresse Email est déjà attribuée";
  };

  checkEmail = async (email: string) => {
    return await this.ecoleModel.findOne({ email: email });
  };

  updateFormations = async (
    add: boolean,
    formationId: string,
    ecoleId: string,
  ) => {
    if (add) {
      const ecole = await this.findOne(ecoleId);
      const newFormations = [...ecole.formations, formationId];
      return await this.ecoleModel.updateOne(
        { _id: ecoleId },
        { formations: newFormations },
      );
    }
  };

  findAll = async () => {
    return await this.ecoleModel.find();
  };

  validate = async (input: validateEcoleDto) => {
    const token = await this.authService.login(input);
    if (token) {
      await this.ecoleModel.findOneAndUpdate(
        { email: input.email },
        { activated: true },
      );
      return token;
    }
    return 'Votre mot de passe est faux';
  };

  updateState = async (id: string) => {
    const ecole: Ecole = await this.findOne(id);
    if (ecole.status === 'Premium')
      return await this.ecoleModel.updateOne(
        { _id: ecole._id },
        { status: 'Standard' },
      );
    return await this.ecoleModel.updateOne(
      { _id: ecole._id },
      { status: 'Premium' },
    );
  };

  findByAlias = async (alias: string) => {
    console.log(alias);
    return await this.ecoleModel.findOne({ alias: alias });
  };

  findOne = async (id: string) => {
    return await this.ecoleModel.findOne({ _id: id });
  };

  update(id: number, updateEcoleDto: UpdateEcoleDto) {
    return `This action updates a #${id} ecole`;
  }

  remove = async (id: string) => {
    return await this.ecoleModel.findOneAndDelete({ _id: id });
  };

  async upload(file: Express.Multer.File) {
    console.log(file);
  }
}
