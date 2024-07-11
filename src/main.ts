import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //enable cors
  app.enableCors();
  app.getHttpAdapter().getInstance().set('trust proxy', true);
  //validation
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors) {
        const result = errors.map(error => ({
          [error.property]: error.children.length > 0 ? 'Invalid Payload' : error.constraints[Object.keys(error.constraints)[0]]
        })).reduce((acc, curr) => Object.assign(acc, curr), {});
        return new BadRequestException(result);
      },
      stopAtFirstError: true
    })
  )

  await app.listen(+process.env.APP_PORT || 3001);
}
bootstrap();
