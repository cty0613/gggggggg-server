import { Body, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-admin.dto';
import { RegisterDto } from './dto/register-admin.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @ApiOkResponse({ type: LoginDto })
    async login(@Body() loginData: LoginDto ) {
        const user = await this.authService.validateAdmin(loginData);
        return this.authService.loginAdmin(user);
    }

    @Post('register')
    @ApiOkResponse({ type: RegisterDto })
    async register(@Body() registerData: RegisterDto ) {
        return this.authService.registerAdmin(registerData);
    }
}
