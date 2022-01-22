import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppConfigService } from '#config/app/config.service';
import { HttpExceptionFilter } from '#common/exceptions/http-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import '#common/utils/env';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn'],
  });
  const options = new DocumentBuilder()
    .setTitle('Seung Ju Server')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  // Get app config for cors settings and starting the app.
  const appConfig = app.get<AppConfigService>(AppConfigService);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  await app.listen(appConfig.port);
}
bootstrap();
