import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Partenaire extends Document {
  @Prop()
  name: string;
  @Prop()
  url: string;
  @Prop()
  logo: string;
}
export const PartenaireSchema = SchemaFactory.createForClass(Partenaire);
