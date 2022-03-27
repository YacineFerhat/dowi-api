import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { EcoleModule } from 'src/ecole/ecole.module';
import { StudentModule } from 'src/student/student.module';
import { FormationModule } from 'src/formation/formation.module';
@Module({
  controllers: [MetricsController],
  providers: [MetricsService],
  imports: [EcoleModule, StudentModule, FormationModule],
})
export class MetricsModule {}
