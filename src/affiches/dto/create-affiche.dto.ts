import { IsString } from 'class-validator';

export class CreateAffichDto {
  @IsString()
  readonly url: string;
  @IsString()
  readonly name: string;
}
