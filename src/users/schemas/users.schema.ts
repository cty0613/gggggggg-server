import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    authType: string;

    @Prop({ required: true })
    pageId: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
