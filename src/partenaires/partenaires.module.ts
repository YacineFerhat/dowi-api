import { Module } from '@nestjs/common';
import { PartenairesService } from './partenaires.service';
import { PartenairesController } from './partenaires.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Partenaire, PartenaireSchema } from './entities/partenaire.entity';

@Module({
  controllers: [PartenairesController],
  providers: [PartenairesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Partenaire.name,
        schema: PartenaireSchema,
      },
    ]),
  ],
})
export class PartenairesModule {}
