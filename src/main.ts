import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appConfig } from './config';
import { NotFoundInterceptor } from './common/interceptors/not-found.interceptor';
import { InvalidSchemaInterceptor } from './common/interceptors/invalid-schema.interceptor';
import { ResultNotAvailableInterceptor } from './common/interceptors/result-not-available.interceptor';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
    cors: true,
  });

  app.use(helmet());

  app.setGlobalPrefix(appConfig.apiPrefix, { exclude: ['actuator'] });
  app.useGlobalInterceptors(new NotFoundInterceptor());
  app.useGlobalInterceptors(new InvalidSchemaInterceptor());
  app.useGlobalInterceptors(new ResultNotAvailableInterceptor());

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Task App DFM')
    .setDescription('The Task App DFM API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
