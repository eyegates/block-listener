import { InMemoryBlockRepositoryStub } from '../../../adapters/secondary/gateways/repositories/stubs/inMemoryBlockRepositoryStub';
import { InMemoryBlockchainGatewayStub } from '../../../adapters/secondary/gateways/blockchain/stubs/inMemoryBlockchainGatewayStub';

import {
  ProcessBlockCommand,
  ProcessBlockCommandHandler,
} from './processBlockCommandHandler';
import { Block } from '../../models/block';

describe('Block Db Writer', () => {
  it('should save received blocks with transactions', async () => {
    const blockRepository = new InMemoryBlockRepositoryStub();
    const blockchainGateway = new InMemoryBlockchainGatewayStub();
    blockchainGateway.givenBlockDetails([
      new Block(41180201, ['0x01', '0x02']),
      new Block(41180202, ['0x01', '0x02']),
      new Block(41180203, ['0x01', '0x02']),
    ]);
    await new ProcessBlockCommandHandler(
      blockRepository,
      blockchainGateway,
    ).handle(new ProcessBlockCommand([41180201, 41180202]));
    const existingBlocks = blockRepository.allBlocks;

    expect(existingBlocks).toEqual([
      Block.restore({ blockNumber: 41180201, transactions: ['0x01', '0x02'] }),
      Block.restore({ blockNumber: 41180202, transactions: ['0x01', '0x02'] }),
    ]);
  });
});
