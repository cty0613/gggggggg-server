import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Book } from './schemas/books.schema';
import { CreateBookDto } from './dto/create-books.dto';

@Injectable()
export class BooksService {
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

    async findAll(): Promise<Book[]> {
        return this.bookModel.find().exec();
    }

    async findOne(bookNum: string): Promise<Book> {
        const book = await this.bookModel.findOne({ bookNum }).exec();
        if (!book) {
            throw new NotFoundException(`Book Number #${bookNum} is not found`);
        }
        return book;
    }

    async create(bookData: CreateBookDto): Promise<Book> {
        const isExist = await this.bookModel.findOne({ bookNum: bookData.bookNum }).exec();
        if (isExist) {
            throw new BadRequestException(`Book Number #${bookData.bookNum} is already exist`);
        }
        const newBook = new this.bookModel(bookData);
        return newBook.save();
    }

    async delete(bookNum: string): Promise<Book> {
        const deletedBook = this.findOne(bookNum);
        this.bookModel.deleteOne({ bookNum }).exec();
        return deletedBook;
    }

    
}
