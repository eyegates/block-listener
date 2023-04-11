export class Block {
  constructor(private blockNumber: number, private transactions: string[]) {}

  get number() {
    return this.blockNumber;
  }

  static restore(blockState: BlockState): Block {
    return new Block(blockState.blockNumber, blockState.transactions);
  }

  takeState(): BlockState {
    return {
      blockNumber: this.blockNumber,
      transactions: this.transactions,
    };
  }
}

export type BlockState = {
  // difficulty: number;
  // extraData: string;
  // gasLimit: string;
  // gasUsed: string;
  // hash: string;
  // miner: string;
  // nonce: string;
  blockNumber: number;
  // parentHash: string;
  // timestamp: number;
  transactions: string[];
};
