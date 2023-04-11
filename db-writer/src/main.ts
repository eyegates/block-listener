import { MikroORM } from '@mikro-orm/postgresql';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './writer-context/adapters/primary/nestjs/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${configService.get<string>(
          'AMQP_USER',
        )}:${configService.get<string>(
          'AMQP_PASSWORD',
        )}@${configService.get<string>(
          'AMQP_HOST',
        )}:${configService.get<string>('AMQP_PORT')}`,
      ],
      queue: configService.get<string>('AMQP_QUEUE_NAME'),
      queueOptions: {
        durable: configService.get<boolean>('AMQP_QUEUE_DURABLE'),
      },
    },
  });
  MikroORM.init();
  await app.startAllMicroservices();
}
bootstrap();
