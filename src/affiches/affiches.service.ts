import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAffichDto } from './dto/create-affiche.dto';
import { UpdateAffichDto } from './dto/update-affich.dto';
import { Affiche } from './entities/affiche.entity';
import saveImage from 'src/utils/saveImage';

@Injectable()
export class AffichesService {
  constructor(
    @InjectModel(Affiche.name)
    private afficheModel: Model<Affiche>,
  ) {}

  create = async (createAffichDto: any, files?) => {
    const imageUrl = await saveImage(files[0], 'someId', 'Blog');
    const affiche = new this.afficheModel({ ...createAffichDto, imageUrl });
    affiche.save();
    console.log(affiche);
    if (affiche) return true;
    else false;
  };

  front = async () => {
    return await this.afficheModel.find().limit(1);
  };

  findAll = async () => {
    return await this.afficheModel.find();
  };

  findOne(id: number) {
    return `This action returns a #${id} affich`;
  }

  update(id: number, updateAffichDto: UpdateAffichDto) {
    return `This action updates a #${id} affich`;
  }

  remove = async (id: string) => {
    return await this.afficheModel.findOneAndDelete({ _id: id });
  };
}
