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
    const ecole_id = '6227532568d6d741d69bfbd4';
    const formation = new this.formationModel({
      ...createFormationDto,
      ecole_id,
      imageUrl,
    });
    formation.save();
    await this.ecoleService.updateFormations(true, formation._id, ecole_id);
    return true;
  }

  findByEcole = async (ecoleId: string) => {
    return await this.formationModel.find({ ecole_id: ecoleId });
  };

  updateState = async (id: string) => {
    const formation: Formation = await this.findOne(id);
    return await this.formationModel.updateOne(
      { _id: formation._id },
      { active: !formation.active },
    );
  };

  findAll() {
    return `This action returns all formation`;
  }

  findOne = async (id: string) => {
    return await this.formationModel.findOne({ _id: id });
  };

  update(id: number, updateFormationDto: UpdateFormationDto) {
    return `This action updates a #${id} formation`;
  }

  remove(id: number) {
    return `This action removes a #${id} formation`;
  }
}
