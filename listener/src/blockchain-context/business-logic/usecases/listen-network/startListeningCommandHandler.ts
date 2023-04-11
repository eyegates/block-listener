import { BlockchainGateway } from '../../gateways/blockchainGateway';

export class StartListeningCommandHandler {
  constructor(private blockchainGateway: BlockchainGateway) {}
  handle() {
    this.blockchainGateway.listenEvent('block');
  }
}
