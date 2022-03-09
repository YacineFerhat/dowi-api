import { IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly author: string;
  @IsString()
  readonly url: string;
  @IsString()
  readonly picture: string;
  @IsString()
  readonly readTime: string;
  @IsString()
  readonly description: string;
}
