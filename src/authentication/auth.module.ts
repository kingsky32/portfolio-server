import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { LocalStrategy } from './local.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '#models/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthConfigService } from '#config/authentication/config.service';
import { AuthConfigModule } from '#config/authentication/config.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    AuthConfigModule,
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      useFactory: async (authConfigService: AuthConfigService) => ({
        secret: authConfigService.access_token_secret,
        signOptions: {
          expiresIn: authConfigService.access_token_expiration_time,
        },
      }),
      inject: [AuthConfigService],
    } as JwtModuleAsyncOptions),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
