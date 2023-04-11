import { EntityRepository } from '@mikro-orm/postgresql';
import { BlockEntity } from './block.entity';

export class CustomBlockRepository extends EntityRepository<BlockEntity> {}
