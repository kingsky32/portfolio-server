import { PostgreDatabaseProviderModule } from './providers/database/postgres/provider.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AppConfigModule } from '#config/app/config.module';
import { FilesController } from '#/models/files/files.controller';
import { FilesModule } from '#/models/files/files.module';

/**
 * Import and provide app related classes.
 *
 * @module
 */
@Module({
  imports: [AppConfigModule, PostgreDatabaseProviderModule, FilesModule],
  controllers: [AppController, FilesController],
  providers: [AppService],
})
export class AppModule {}
