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
  alias: string;
  @Prop()
  picture?: string;
  @Prop({ default: type.Standard })
  status: type;
  @Prop()
  state: string;
  @Prop({ default: false })
  activated: boolean;
  @Prop({ default: true })
  active: boolean;
  @Prop({ default: false })
  premium: boolean;
  @Prop({ type: SchemaTypes.Array, ref: 'formations' })
  formations?: Array<Types.ObjectId>;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'auths' })
  auth_id: Types.ObjectId;
}
export const EcoleSchema = SchemaFactory.createForClass(Ecole);
