import { IsString } from 'class-validator';

export class CreatePartenaireDto {
  @IsString()
  readonly url: string;
  @IsString()
  readonly name: string;
  @IsString()
  readonly logo: string;
}
