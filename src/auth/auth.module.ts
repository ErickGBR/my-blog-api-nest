import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import {PassportModule} from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
@Module({
  providers: [AuthService, LocalStrategy],
  imports: [UsersModule, PassportModule.register({ defaultStrategy: 'local' })],
})
export class AuthModule {}
