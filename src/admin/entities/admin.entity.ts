import { Document, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Admin extends Document {
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  grade: string;
  @Prop()
  alias: string;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'auth' })
  auth_id: Types.ObjectId;
}
export const AdminSchema = SchemaFactory.createForClass(Admin);
