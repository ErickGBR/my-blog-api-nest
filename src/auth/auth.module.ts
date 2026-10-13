import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Env } from '../env.model';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env>) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
    /*JwtModule.register({
    secret: 'my-secret-key',
    signOptions: { expiresIn: '60s' }
    })
    */
  ],
  controllers: [AuthController],
})
export class AuthModule { }
