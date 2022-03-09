import { IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  readonly name?: string;
  @IsString()
  readonly phoneNumber?: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly wilaya?: string;
  @IsString()
  readonly gender?: string;
  @IsString()
  readonly dateOfBirth?: string;
  @IsString()
  readonly status?: string;
  @IsString()
  readonly password: string;
  @IsString()
  readonly confirmPwd: string;
}
