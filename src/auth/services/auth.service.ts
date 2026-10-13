import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }
    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.getUserByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Unauthorized');
        }

        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Unauthorized');
        }
        return user;
    }

    async generateToken(user: any): Promise<string> {
        const payload = { sub: user.id };
        return this.jwtService.sign(payload);
    }
}
