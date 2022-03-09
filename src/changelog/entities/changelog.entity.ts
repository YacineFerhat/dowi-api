import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, SchemaTypes, Types } from 'mongoose';
@Schema()
export class Changelog extends Document {
  @Prop()
  code: string;
  @Prop()
  date: string;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'admin' })
  admin: Types.ObjectId;
}
export const ChangelogSchema = SchemaFactory.createForClass(Changelog);
