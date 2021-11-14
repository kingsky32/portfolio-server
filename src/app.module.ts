import { PostgreDatabaseProviderModule } from './providers/database/postgres/provider.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AppConfigModule } from '#config/app/config.module';
/**
 * Import and provide app related classes.
 *
 * @module
 */
@Module({
  imports: [AppConfigModule, PostgreDatabaseProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
