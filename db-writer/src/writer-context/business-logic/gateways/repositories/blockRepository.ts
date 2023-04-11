import { Block } from '../../models/block';

export interface BlockRepository {
  save(block: Block): void;
}
