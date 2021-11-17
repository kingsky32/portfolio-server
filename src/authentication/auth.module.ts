import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '#models/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './jwt.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, JWTStrategy],
})
export class AuthModule {}
