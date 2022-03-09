import { IsString } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  readonly email: string;
  @IsString()
  readonly password?: string;
}
