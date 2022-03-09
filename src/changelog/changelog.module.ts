import { Module } from '@nestjs/common';
import { ChangelogService } from './changelog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Changelog, ChangelogSchema } from './entities/changelog.entity';

@Module({
  providers: [ChangelogService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Changelog.name,
        schema: ChangelogSchema,
      },
    ]),
  ],
  exports: [ChangelogService],
})
export class ChangelogModule {}
