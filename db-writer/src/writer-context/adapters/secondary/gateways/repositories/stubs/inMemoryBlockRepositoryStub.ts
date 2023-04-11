import { BlockRepository } from 'src/writer-context/business-logic/gateways/repositories/blockRepository';
import { Block } from '../../../../../business-logic/models/block';

export class InMemoryBlockRepositoryStub implements BlockRepository {
  private blocks: Block[] = [];

  get allBlocks(): Block[] {
    return this.blocks;
  }
  save(block: Block) {
    this.blocks.push(block);
    console.log(`Block ${block.number} saved successfully`);
  }
}
