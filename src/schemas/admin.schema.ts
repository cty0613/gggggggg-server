import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Admin extends Document {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    authType: string;

}

export const AdminSchema = SchemaFactory.createForClass(Admin);
