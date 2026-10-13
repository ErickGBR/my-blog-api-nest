
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from '../../env.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService<Env>
    ) {
        const jwtSecret = configService.get<string>('JWT_SECRET');
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined in the environment variables');
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub };
    }
}
