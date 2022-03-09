import { Injectable } from '@nestjs/common';
import { CreatePartenaireDto } from './dto/create-partenaire.dto';
import { UpdatePartenaireDto } from './dto/update-partenaire.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Partenaire } from './entities/partenaire.entity';
import { Model } from 'mongoose';

@Injectable()
export class PartenairesService {
  constructor(
    @InjectModel(Partenaire.name)
    private partenaireModel: Model<Partenaire>,
  ) {}

  create(createPartenaireDto: CreatePartenaireDto) {
    const affiche = new this.partenaireModel(createPartenaireDto);
    affiche.save();
    return 'Affiche créé';
  }

  findAll = async () => {
    return await this.partenaireModel.find();
  };

  findOne(id: number) {
    return `This action returns a #${id} partenaire`;
  }

  update(id: number, updatePartenaireDto: UpdatePartenaireDto) {
    return `This action updates a #${id} partenaire`;
  }

  remove = async (id: string) => {
    return await this.partenaireModel.findOneAndDelete({ _id: id });
  };
}
