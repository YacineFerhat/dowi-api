import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { type } from './type.enum';
@Schema()
export class Ecole extends Document {
  @Prop()
  name: string;
  @Prop()
  adress: string;
  @Prop()
  backupMail: string;
  @Prop()
  phone: string;
  @Prop()
  email: string;
  @Prop()
  startDate: string;
  @Prop()
  picture?: string;
  @Prop({ default: type.Standard })
  status: type;
  @Prop()
  state: string;
  @Prop({ default: false })
  activated: boolean;
  @Prop({ type: SchemaTypes.Array, ref: 'formation' })
  formations?: Array<Types.ObjectId>;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'auth' })
  auth_id: Types.ObjectId;
}
export const EcoleSchema = SchemaFactory.createForClass(Ecole);
