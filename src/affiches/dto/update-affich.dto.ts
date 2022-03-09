import { PartialType } from '@nestjs/mapped-types';
import { CreateAffichDto } from './create-affiche.dto';

export class UpdateAffichDto extends PartialType(CreateAffichDto) {}
