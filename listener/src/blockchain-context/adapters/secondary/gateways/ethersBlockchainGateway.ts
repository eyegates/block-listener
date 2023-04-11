import { ClientProxy } from '@nestjs/microservices';
import { JsonRpcProvider } from 'ethers';
import {
  BlockchainEvent,
  BlockchainGateway,
} from '../../../business-logic/gateways/blockchainGateway';

export class EthersBlockchainGateway implements BlockchainGateway {
  constructor(
    private readonly rabbitClient: ClientProxy,
    private readonly provider: JsonRpcProvider,
  ) {}

  listenEvent(eventName: BlockchainEvent) {
    this.provider.on(eventName, async (blockNumber: number) => {
      this.rabbitClient.emit({ cmd: 'block' }, blockNumber).subscribe();

      console.log(`Message sent for block ${blockNumber}`);
    });
  }
}
