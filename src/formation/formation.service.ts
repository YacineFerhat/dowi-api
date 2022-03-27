import { Injectable } from '@nestjs/common';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import saveImage from 'src/utils/saveImage';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Formation } from './entities/formation.entity';
import { EcoleService } from 'src/ecole/ecole.service';

@Injectable()
export class FormationService {
  constructor(
    @InjectModel(Formation.name)
    private formationModel: Model<Formation>,
    private ecoleService: EcoleService,
  ) {}

  async create(createFormationDto: any, files?) {
    const imageUrl = await saveImage(files[0], 'someId', 'PledgeLevel');
    const ecole = await this.ecoleService.findByAuthId(
      createFormationDto.auth_id,
    );
    const formation = new this.formationModel({
      ...createFormationDto,
      ecole_id: ecole._id,
      participants: 0,
      imageUrl,
    });
    formation.save();
    await this.ecoleService.updateFormations(true, formation._id, ecole._id);
    return true;
  }

  findByEcole = async (authId: string) => {
    const ecole = await this.ecoleService.findByAuthId(authId);
    return await this.formationModel.find({ ecole_id: ecole._id });
  };

  updateState = async (id: string) => {
    const formation: Formation = await this.findOne(id);
    return await this.formationModel.updateOne(
      { _id: formation._id },
      { active: !formation.active },
    );
  };

  updateTop = async (id: string) => {
    const formation: Formation = await this.findOne(id);
    return await this.formationModel.updateOne(
      { _id: formation._id },
      { top: !formation.top },
    );
  };

  findAll = async () => {
    return await this.formationModel.find();
  };

  findOne = async (id: string) => {
    const formation = await this.formationModel.findOne({ _id: id });
    const ecole = await this.ecoleService.findOne(
      formation.ecole_id.toString(),
    );
    const obj = { formation, ecole };
    return formation;
  };

  topFormations = async () => {
    return await this.formationModel.find({ top: true }).limit(4);
  };

  count = async () => {
    return await this.formationModel.countDocuments();
  };

  findMultiple = async (ids: any) => {
    return await this.formationModel.find({ _id: { $in: ids } });
  };

  update(id: number, updateFormationDto: UpdateFormationDto) {
    return `This action updates a #${id} formation`;
  }

  remove(id: number) {
    return `This action removes a #${id} formation`;
  }
}
