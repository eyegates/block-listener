import { BlockRepository } from '../../../../../business-logic/gateways/repositories/blockRepository';
import { Block } from 'src/writer-context/business-logic/models/block';
import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';

export class SqlBlockRepository implements BlockRepository {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}
  async save(block: Block): Promise<void> {
    console.log('orm = ', this.orm);
    console.log('em = ', this.em);

    const blockState = block.takeState();
    await this.em.persistAndFlush({
      blockNumber: blockState.blockNumber,
    });
  }
}
