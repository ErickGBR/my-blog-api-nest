import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './services/auth.service';
import { UserEntity } from '../../src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req: Request) {
        const user = req.user as UserEntity;
        const token = await this.authService.generateToken(user);
        return {
            user,
            access_token: token
        };
    }
}
