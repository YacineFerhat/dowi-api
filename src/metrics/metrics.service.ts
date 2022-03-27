import { Injectable } from '@nestjs/common';
import { CreateMetricDto } from './dto/create-metric.dto';
import { UpdateMetricDto } from './dto/update-metric.dto';
import { FormationService } from 'src/formation/formation.service';
import { EcoleService } from 'src/ecole/ecole.service';
import { StudentService } from 'src/student/student.service';
@Injectable()
export class MetricsService {
  constructor(
    private ecoleService: EcoleService,
    private studentServeice: StudentService,
    private formationService: FormationService,
  ) {}
  create(createMetricDto: CreateMetricDto) {
    return 'This action adds a new metric';
  }

  findAll = async () => {
    const ecoles = await this.ecoleService.count();
    const formations = await this.formationService.count();
    const students = await this.studentServeice.count();
    const metrics = {
      ecoles,
      formations,
      students,
    };
    return metrics;
  };

  findOne(id: number) {
    return `This action returns a #${id} metric`;
  }

  update(id: number, updateMetricDto: UpdateMetricDto) {
    return `This action updates a #${id} metric`;
  }

  remove(id: number) {
    return `This action removes a #${id} metric`;
  }
}
