import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Blog extends Document {
  @Prop()
  name: string;
  @Prop()
  author: string;
  @Prop()
  imageUrl: string;
  @Prop()
  categorie: string;
  @Prop()
  readTime: string;
  @Prop()
  editor: string;
  @Prop({ default: Date.now(), type: Date })
  date: Date;
  @Prop({ default: true })
  active: boolean;
}
export const BlogSchema = SchemaFactory.createForClass(Blog);
