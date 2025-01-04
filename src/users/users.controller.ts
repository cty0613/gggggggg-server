import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userSevice: UsersService ) {}

    @Get("/all")
    async findAll() {
        return this.userSevice.findAllInvitees();
    }

    @Get("/:userId")
    async findOne(@Param("userId") userId: string) {
        return this.userSevice.findOneInvitee(userId);
    }

    @Post("/new")
    async createInvitee(@Body() userData: CreateUserDto) {
        return this.userSevice.createInvitee(userData);
    }

    @Delete("/delete/:userId")
    async deleteInvitee(@Param("userId") userId: string) {
        return this.userSevice.deleteInvitee(userId);
    }
}
