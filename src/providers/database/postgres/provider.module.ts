import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PostgresConfigModule } from '#config/database/postgres/config.module';
import { PostgresConfigService } from '#config/database/postgres/config.service';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule],
      useFactory: async (postgresConfigService: PostgresConfigService) => ({
        type: 'postgres' as DatabaseType,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        host: postgresConfigService.host,
        port: postgresConfigService.port,
        username: postgresConfigService.username,
        password: postgresConfigService.password,
        database: postgresConfigService.database,
      }),
      inject: [PostgresConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class PostgreDatabaseProviderModule {}
