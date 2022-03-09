import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Affiche extends Document {
  @Prop()
  name: string;
  @Prop()
  url: string;
}
export const AfficheSchema = SchemaFactory.createForClass(Affiche);
