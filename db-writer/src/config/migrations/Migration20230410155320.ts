import { Migration } from '@mikro-orm/migrations';

export class Migration20230410155320 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "block_entity" ("_id" serial primary key, "difficulty" int not null, "extra_data" varchar(255) not null, "gas_limit" varchar(255) not null, "gas_used" varchar(255) not null, "hash" varchar(255) not null, "miner" varchar(255) not null, "nonce" varchar(255) not null, "block_number" int not null, "parent_hash" varchar(255) not null, "timestamp" int not null);');
  }

}
