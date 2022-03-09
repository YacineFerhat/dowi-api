import { IsString } from 'class-validator';

export class validateEcoleDto {
  @IsString()
  readonly email: string;
  @IsString()
  readonly password: string;
}
