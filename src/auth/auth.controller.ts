import { Body, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() body: {userId: string, password: string}) {
        const user= await this.authService.validateUser(body.userId, body.password);
        return this.authService.login(user);
    }
}
