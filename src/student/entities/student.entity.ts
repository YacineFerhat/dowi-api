import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { gender, status } from './type.enum';
@Schema()
export class Student extends Document {
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  wilaya: string;
  @Prop()
  phoneNumber: string;
  @Prop()
  dateOfBirth: string;
  @Prop({ default: Date.now() })
  createdAt: Date;
  @Prop({ default: gender.Male })
  gender: gender;
  @Prop()
  status: status;
  @Prop({ type: SchemaTypes.Array, ref: 'formation' })
  formations?: Array<Types.ObjectId>;
  @Prop()
  searchField: string[];
  @Prop({ type: SchemaTypes.ObjectId, ref: 'auth' })
  auth_id: Types.ObjectId;
  @Prop()
  alias: string;
}
export const StudentSchema = SchemaFactory.createForClass(Student);
