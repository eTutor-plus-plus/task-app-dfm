import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { appConfig } from './config';
import { NotFoundInterceptor } from './common/interceptors/not-found.interceptor';
import { InvalidPointsInterceptor } from './common/interceptors/invalid-points.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.setGlobalPrefix(appConfig.apiPrefix);
  app.useGlobalInterceptors(new NotFoundInterceptor());
  app.useGlobalInterceptors(new InvalidPointsInterceptor());

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
