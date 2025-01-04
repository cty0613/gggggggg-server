import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

import { User } from 'src/schemas/users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async findUser(userId: string): Promise<User> {
        return this.userModel.findOne({ userId }).exec();
    }

    async validateUser(userId: string, password: string): Promise<any> {
        const user = await this.findUser(userId);
        if (user && (await bcrypt.compare(password, user.password))) {
          const { password, ...result } = user.toObject();
          return result;
        }
        throw new UnauthorizedException('Invalid User ID or Password');
      }
    
    async login(user: any) {
        const payload = { userId: user.userId, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
