import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;

  app.enableCors({
    origin: ['http://localhost:5173', 'https://gobasera-omega.vercel.app'],
  });
  await app.listen(port, '0.0.0.0');
}
bootstrap();