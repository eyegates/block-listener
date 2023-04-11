import { NestFactory } from '@nestjs/core';
import { AppModule } from './blockchain-context/adapters/primary/nestjs/app.module';
import { StartListeningCommandHandler } from './blockchain-context/business-logic/usecases/listen-network/startListeningCommandHandler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const service = app.get(StartListeningCommandHandler);
  service.handle();
}
bootstrap();
