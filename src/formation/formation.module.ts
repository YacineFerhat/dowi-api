import { Module } from '@nestjs/common';
import { FormationService } from './formation.service';
import { FormationController } from './formation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Formation, FormationSchema } from './entities/formation.entity';
import { EcoleModule } from 'src/ecole/ecole.module';
@Module({
  controllers: [FormationController],
  providers: [FormationService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Formation.name,
        schema: FormationSchema,
      },
    ]),
    EcoleModule,
  ],
})
export class FormationModule {}
