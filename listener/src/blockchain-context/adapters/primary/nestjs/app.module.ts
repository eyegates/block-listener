import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { StartListeningCommandHandler } from '../../../business-logic/usecases/listen-network/startListeningCommandHandler';
import { BlockchainGateway } from '../../../business-logic/gateways/blockchainGateway';
import { ethers, JsonRpcProvider } from 'ethers';
import { EthersBlockchainGateway } from '../../secondary/gateways/ethersBlockchainGateway';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
  ],
  providers: [
    {
      provide: JsonRpcProvider,
      useFactory: (configService: ConfigService) => {
        return new ethers.JsonRpcProvider(configService.get('JSON_RPC_URL'));
      },
      inject: [ConfigService],
    },
    {
      provide: 'ClientProxy',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
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
      },
      inject: [ConfigService],
    },
    {
      provide: StartListeningCommandHandler,
      useFactory: (blockchainGateway: BlockchainGateway) => {
        return new StartListeningCommandHandler(blockchainGateway);
      },
      inject: ['BlockchainGateway'],
    },
    {
      provide: 'BlockchainGateway',
      useFactory: (proxy, provider) =>
        new EthersBlockchainGateway(proxy, provider),
      inject: ['ClientProxy', JsonRpcProvider],
    },
  ],
})
export class AppModule {}
