import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AppConfigModule } from '#config/app/config.module';
import { PostgreDatabaseProviderModule } from './providers/database/postgres/provider.module';
import { FilesController } from './models/files/files.controller';
import { FilesModule } from './models/files/files.module';
import { CodesModule } from './models/codes/codes.module';
import { CodesController } from './models/codes/codes.controller';
import { ToolsModule } from './models/tools/tools.module';
import { ToolsController } from './models/tools/tools.controller';
import { AuthModule } from './authentication/auth.module';
import { AuthController } from './authentication/auth.controller';
import { UserTypesModule } from './models/user-types/user-types.module';
import { UserTypesController } from './models/user-types/user-types.controller';
import { UsersModule } from './models/users/users.module';
import { UsersController } from './models/users/users.controller';
import { UserTypesGuard } from './common/guards/user-types.guard';

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
    ToolsModule,
    AuthModule,
    UserTypesModule,
    UsersModule,
  ],
  controllers: [
    AppController,
    FilesController,
    CodesController,
    ToolsController,
    AuthController,
    UserTypesController,
    UsersController,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: UserTypesGuard,
    },
  ],
})
export class AppModule {}
