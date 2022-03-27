import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
@Schema()
export class Formation extends Document {
  @Prop()
  name: string;
  @Prop()
  price: number;
  @Prop()
  duration: string;
  @Prop()
  date: string;
  @Prop()
  hours: number;
  @Prop()
  editor: string;
  @Prop()
  certified: boolean;
  @Prop({ default: true })
  active: boolean;
  @Prop({ default: false })
  top: boolean;
  @Prop({ default: 0 })
  participants: number;
  @Prop()
  categorie: string;
  @Prop()
  imageUrl: string;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'ecoles' })
  ecole_id: Types.ObjectId;
}
export const FormationSchema = SchemaFactory.createForClass(Formation);
