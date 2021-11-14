import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { AppConfigService } from '#config/app/config.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import '#common/utils/env';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Get app config for cors settings and starting the app.
  const appConfig = app.get<AppConfigService>(AppConfigService);
  await app.listen(appConfig.port);
}
bootstrap();
