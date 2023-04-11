import { Block } from '../models/block';

export interface BlockchainGateway {
  retrieveBlockDetails(blockNumber: number): Promise<Block>;
}
