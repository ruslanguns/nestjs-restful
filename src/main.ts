import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './shared/pipes/validation.pipe';
import { Logger } from '@nestjs/common';
import { AllExceptionsFilter } from './shared/filters/all-exception.filter';

const HOST = 'http://localhost';
const PORT = process.env.SERVER_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      // '*', // To All, comment this line for production
      'http://localhost:4200', // angular
      'http://localhost:3000', // react
      'http://localhost:8081', // react-native
    ],
  });

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new AllExceptionsFilter()); // enable on production
  await app.listen(PORT);
  Logger.log(`Server running on ${HOST}:${PORT}`, 'Bootstrap');
}
bootstrap();
