import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';

@Module({
    imports: [
        MongooseModule.forRoot(
            'mongodb+srv://cty0613:dbanna0622@cluster0.yfdospx.mongodb.net/gggggggg-db?retryWrites=true&w=majority&appName=Cluster0'
        ),
        BooksModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
