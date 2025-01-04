import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-users.dto';
import { User } from '../schemas/users.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findAllInvitees(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOneInvitee(userId: string): Promise<User> {
        const user = await this.userModel.findOne({ userId }).exec();
        console.log(user);
        if (!user) {
            throw new NotFoundException(`User ID ${userId} is not found`);
        }
        return user;
    }

    async createInvitee(userData: CreateUserDto): Promise<User> {
        const isExist = await this.userModel.findOne({ userId: userData.userId }).exec();
        if (isExist) {
            throw new BadRequestException(`User ID ${userData.userId} is already exist`);
        }
        const newUser = new this.userModel(userData);
        return newUser.save();
    }

    async deleteInvitee(userId: string): Promise<User> {
        const deletedUser = this.findOneInvitee(userId);
        this.userModel.deleteOne({ userId : userId }).exec();

        return deletedUser;
    }

}
