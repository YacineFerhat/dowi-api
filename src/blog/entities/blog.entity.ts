import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Blog extends Document {
  @Prop()
  name: string;
  @Prop()
  url: string;
  @Prop()
  title: string;
  @Prop()
  author: string;
  @Prop()
  picture: string;
  @Prop()
  categorie: string;
  @Prop()
  readTime: string;
  @Prop()
  description: string;
}
export const BlogSchema = SchemaFactory.createForClass(Blog);
