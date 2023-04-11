import { BlockchainGateway } from '../../../../../business-logic/gateways/blockchainGateway';
import { Block } from '../../../../../business-logic/models/block';

export class InMemoryBlockchainGatewayStub implements BlockchainGateway {
  private blocks: Block[] = [];

  async retrieveBlockDetails(blockNumber: number): Promise<Block> {
    return this.blocks.find((_block: Block) => {
      return _block.number === blockNumber;
    });
  }

  givenBlockDetails(blockDetails: Block[]) {
    this.blocks = blockDetails;
  }
}
