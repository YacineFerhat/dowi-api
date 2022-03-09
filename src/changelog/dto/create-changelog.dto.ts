import { IsString } from 'class-validator';

export class CreateChangelogDto {
  @IsString()
  readonly code: string;
  @IsString()
  readonly admin: string;
}
