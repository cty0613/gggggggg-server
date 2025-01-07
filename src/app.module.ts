import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { InviteeModule } from './invitee/invitee.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './files/files.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(
            'mongodb+srv://cty0613:dbanna0622@cluster0.yfdospx.mongodb.net/gggggggg-db?retryWrites=true&w=majority&appName=Cluster0'
        ),
        InviteeModule,
        BooksModule,
        AuthModule,
        FilesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
