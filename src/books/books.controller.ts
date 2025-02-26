import { Controller, Query, UseGuards } from '@nestjs/common';
import { Get, Post, Delete, Param, Body } from '@nestjs/common';

import { CreateBookDto } from './dto/create-books.dto';
import { BooksService } from './books.service';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';

@Controller('books')
export class BooksController {
    constructor( private readonly booksService: BooksService ) {}

    @Get("/all") 
    async findAll() {
        return this.booksService.findAll();
    }

    @Get("/:bookNum") // Path Param
    async findOne(@Param("bookNum") bookNum: string) {
        return this.booksService.findOne(bookNum);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @Post("/new") // JSON Body
    async create(@Body() bookData: CreateBookDto) {
        return this.booksService.create(bookData);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @Delete("/delete/:bookNum") // Query 
    async delete(@Param("bookNum") bookNum: string) {
        return this.booksService.delete(bookNum);
    }


}
