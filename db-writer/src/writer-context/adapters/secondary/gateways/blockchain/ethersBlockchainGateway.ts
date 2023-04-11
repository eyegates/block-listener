import { JsonRpcProvider } from 'ethers';
import { BlockchainGateway } from '../../../../business-logic/gateways/blockchainGateway';
import { Block } from '../../../../business-logic/models/block';

export class EthersBlockchainGateway implements BlockchainGateway {
  constructor(private readonly provider: JsonRpcProvider) {}
  async retrieveBlockDetails(blockNumber: number): Promise<Block> {
    const details = await this.provider.getBlock(blockNumber, true);

    return new Block(
      details.number,
      details.transactions.map((t) => t),
    );
  }
}
