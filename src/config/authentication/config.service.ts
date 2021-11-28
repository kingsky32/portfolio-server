import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class AuthConfigService {
  constructor(private configService: ConfigService) {}

  get access_token_secret(): string {
    return this.configService.get<string>('auth.access_token_secret');
  }
  get access_token_expiration_time(): string {
    return this.configService.get<string>('auth.access_token_expiration_time');
  }
  get refresh_token_secret(): string {
    return this.configService.get<string>('auth.refresh_token_secret');
  }
  get refresh_token_expiration_time(): string {
    return this.configService.get<string>('auth.refresh_token_expiration_time');
  }
}
