import { PostgreDatabaseProviderModule } from './providers/database/postgres/provider.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AppConfigModule } from '#config/app/config.module';
import { FilesController } from '#/models/files/files.controller';
import { FilesModule } from '#/models/files/files.module';
import { CodesModule } from './models/codes/codes.module';
import { CodesController } from './models/codes/codes.controller';

/**
 * Import and provide app related classes.
 *
 * @module
 */
@Module({
  imports: [
    AppConfigModule,
    PostgreDatabaseProviderModule,
    FilesModule,
    CodesModule,
  ],
  controllers: [AppController, FilesController, CodesController],
  providers: [AppService],
})
export class AppModule {}
