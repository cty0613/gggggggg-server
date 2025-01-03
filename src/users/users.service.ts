import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-users.dto';
import { User } from './schemas/users.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(userDto: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(userDto);
        return newUser.save();
    }
    
    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    async delete(id: string): Promise<User> {
        return this.userModel.findByIdAndDelete(id).exec();
      }

    // async signInInvitee(userId: string): Promise<User | any> {
    //     return this.userModel.findOne
    // }

    // async signInAdmin(userId: string, password: string): Promise<User | any> {
    //     //
    // }


}
