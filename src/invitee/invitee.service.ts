import { BadRequestException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateInviteeDto } from './dto/create-invitee.dto';
import { Invitee } from '../schemas/invitee.schema';

@Injectable()
export class InviteeService {
    constructor(@InjectModel(Invitee.name) private userModel: Model<Invitee>) {}

    async findAllUsers(): Promise<Invitee[]> {
        return this.userModel.find().exec();
    }

    async findUser(userId: string): Promise<Invitee> {
        const user = await this.userModel.findOne({ userId }).exec();
        console.log(user);
        if (!user) {
            throw new NotFoundException(`User ID ${userId} is not found`);
        }
        return user;
    }

    async createUser(userData: CreateInviteeDto): Promise<Invitee> {
        const isExist = await this.userModel.findOne({ userId: userData.userId }).exec();
        if (isExist) {
            throw new BadRequestException(`User ID ${userData.userId} is already exist`);
        }
        const newUser = new this.userModel(userData);
        return newUser.save();
    }

    async deleteUser(userId: string): Promise<Invitee> {
        const deletedUser = this.findUser(userId);
        this.userModel.deleteOne({ userId : userId }).exec();

        return deletedUser;
    }

}
