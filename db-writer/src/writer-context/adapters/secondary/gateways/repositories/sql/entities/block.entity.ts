import { EntitySchema } from '@mikro-orm/core';

export class BlockEntity {
  id: number;
  difficulty: number;
  extraData: string;
  gasLimit: string;
  gasUsed: string;
  hash: string;
  miner: string;
  nonce: string;
  blockNumber: number;
  parentHash: string;
  timestamp: number;
}

export const BlockSchema = new EntitySchema<BlockEntity>({
  class: BlockEntity,
  properties: {
    _id: { type: 'number', primary: true },
    difficulty: { type: 'number' },
    extraData: { type: 'string' },
    gasLimit: { type: 'string' },
    gasUsed: { type: 'string' },
    hash: { type: 'string' },
    miner: { type: 'string' },
    nonce: { type: 'string' },
    blockNumber: { type: 'number' },
    parentHash: { type: 'string' },
    timestamp: { type: 'number' },
  },
});

// export default {
//   EntityX: BlockEntity,
//   schema: BlockSchema,
//   entity: BlockEntity,
// };
