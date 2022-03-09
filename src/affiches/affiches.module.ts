import { Module } from '@nestjs/common';
import { AffichesService } from './affiches.service';
import { AffichesController } from './affiches.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Affiche, AfficheSchema } from './entities/affiche.entity';
@Module({
  controllers: [AffichesController],
  providers: [AffichesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Affiche.name,
        schema: AfficheSchema,
      },
    ]),
  ],
})
export class AffichesModule {}
