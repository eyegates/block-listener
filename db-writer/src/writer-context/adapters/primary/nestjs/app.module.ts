import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ethers, JsonRpcProvider } from 'ethers';
import { BlockchainGateway } from '../../../business-logic/gateways/blockchainGateway';
import { BlockRepository } from '../../../business-logic/gateways/repositories/blockRepository';
import { ProcessBlockCommandHandler } from '../../../business-logic/usecases/process-block/processBlockCommandHandler';
import { EthersBlockchainGateway } from '../../secondary/gateways/blockchain/ethersBlockchainGateway';
import { SqlBlockRepository } from '../../secondary/gateways/repositories/sql/sqlBlockRepository';
import { InMemoryBlockRepositoryStub } from '../../secondary/gateways/repositories/stubs/inMemoryBlockRepositoryStub';
import { BlocksController } from './controllers/blocks.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    MikroOrmModule.forRoot(),
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
      provide: ProcessBlockCommandHandler,
      useFactory: (
        blockchainGateway: BlockchainGateway,
        blockRepository: BlockRepository,
      ) => {
        return new ProcessBlockCommandHandler(
          blockRepository,
          blockchainGateway,
        );
      },
      inject: ['BlockchainGateway', 'BlockRepository'],
    },
    {
      provide: 'BlockchainGateway',
      useFactory: (provider) => new EthersBlockchainGateway(provider),
      inject: [JsonRpcProvider],
    },
    {
      provide: 'BlockRepository',
      useClass: InMemoryBlockRepositoryStub,
    },
  ],
  controllers: [BlocksController],
})
export class AppModule {}
