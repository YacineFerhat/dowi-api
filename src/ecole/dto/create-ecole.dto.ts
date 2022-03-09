import { IsString } from 'class-validator';

export class CreateEcoleDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly adress: string;
  @IsString()
  readonly phone: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly backupMail: string;
  @IsString()
  readonly startDate: string;
}
