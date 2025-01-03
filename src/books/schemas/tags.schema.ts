import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tags {
  @Prop({ required: true })
  default: string;

  @Prop({ required: true })
  kor: string;

  @Prop({ required: true })
  eng: string;
}

export const TagsSchema = SchemaFactory.createForClass(Tags);
export type TagsDocument = Tags & Document;