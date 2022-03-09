import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateChangelogDto } from './dto/create-changelog.dto';
import { UpdateChangelogDto } from './dto/update-changelog.dto';
import { Changelog } from './entities/changelog.entity';
import { Model } from 'mongoose';

@Injectable()
export class ChangelogService {
  constructor(
    @InjectModel(Changelog.name)
    private changelogModel: Model<Changelog>,
  ) {}

  create(createChangelogDto: CreateChangelogDto) {
    const changelog = new this.changelogModel(createChangelogDto);
    changelog.save();
    return changelog._id;
  }
}
