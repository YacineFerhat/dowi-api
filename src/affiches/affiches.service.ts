import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAffichDto } from './dto/create-affiche.dto';
import { UpdateAffichDto } from './dto/update-affich.dto';
import { Affiche } from './entities/affiche.entity';

@Injectable()
export class AffichesService {
  constructor(
    @InjectModel(Affiche.name)
    private afficheModel: Model<Affiche>,
  ) {}
  create(createAffichDto: CreateAffichDto) {
    const affiche = new this.afficheModel(createAffichDto);
    affiche.save();
    return 'Affiche créé';
  }

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
