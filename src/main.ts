import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const logger = new Logger('bootstrap');

  // Log the JWT_SECRET to verify it's being loaded
  logger.log(`JWT_SECRET: ${process.env.JWT_SECRET}`);
  await app.listen(3332);
  logger.log('Application is running on: ' + (await app.getUrl()));
  // In main.ts or app.module.ts
  //console.log(process.env.JWT_SECRET); // This should print "SUPER-SECRET"
}
bootstrap();
