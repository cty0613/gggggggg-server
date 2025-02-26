import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

import { Admin } from 'src/schemas/admin.schema';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-admin.dto';
import { RegisterDto } from './dto/register-admin.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Admin.name) private userModel: Model<Admin>,
        private jwtService: JwtService,
    ) {}

    async findUser(userId: string): Promise<Admin> {
        return this.userModel.findOne({ userId }).exec();
    }

    async validateAdmin(loginData: LoginDto): Promise<any> {
        const user = await this.findUser(loginData.userId);
        if (user && (await bcrypt.compare(loginData.password, user.password))) {
          const { password, ...result } = user.toObject();
          return result;
        }
        throw new UnauthorizedException('Invalid User ID or Password');
      }
    
    async loginAdmin(user: any) {
        const payload = { userId: user.userId, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async registerAdmin(registerData: RegisterDto): Promise<Admin> {
        const isExist = await this.findUser(registerData.userId);
        if (isExist) {
            throw new BadRequestException(`User ID ${registerData.userId} is already exist`);
        }
        const hashedPassword = await bcrypt.hash(registerData.password, 10);
        const newUser = new this.userModel({
            userId: registerData.userId,
            password: hashedPassword,
            authType: registerData.authType,
        });
        return newUser.save();
    }

}
