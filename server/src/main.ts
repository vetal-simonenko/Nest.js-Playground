import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    credentials: true,
    origin: [process.env.CLIENT_URL],
    exposeHeaders: 'set-cookie',
  });

  await app.listen(5000);
}

void bootstrap();
