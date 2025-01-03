import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Tags, TagsSchema } from './tags.schema';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  bookNum: string;

  @Prop({ type: TagsSchema, required: true })
  tags: Tags;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  pageCount: number;

  @Prop({ required: true })
  coverBW: string;

  @Prop({ required: true })
  coverColor: string;

  @Prop({ type: [String], required: true })
  pages: string[];

  @Prop({ type: [String], required: true })
  thumbnails: string[];
}

export const BookSchema = SchemaFactory.createForClass(Book);