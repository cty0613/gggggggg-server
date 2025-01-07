import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { InviteeService } from './invitee.service';
import { CreateInviteeDto } from './dto/create-invitee.dto';
import { ApiResponse } from '@nestjs/swagger';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@Controller('invitees')
export class InviteeController {
    constructor(private readonly userSevice: InviteeService ) {}

    @Get("/all")
    async findAll() {
        return this.userSevice.findAllUsers();
    }

    @Get("/:userId")
    async findOne(@Param("userId") userId: string) {
        return this.userSevice.findUser(userId);
    }

    @ApiResponse({ status: 201, description: 'JOSN Body', type: CreateInviteeDto })
    @Post("/new")
    async createInvitee(@Body() userData: CreateInviteeDto) {
        return this.userSevice.createUser(userData);
    }

    @Delete("/delete/:userId")
    async deleteInvitee(@Param("userId") userId: string) {
        return this.userSevice.deleteUser(userId);
    }
}
