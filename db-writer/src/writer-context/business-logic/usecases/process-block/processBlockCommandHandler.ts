import { BlockchainGateway } from '../../gateways/blockchainGateway';
import { BlockRepository } from '../../gateways/repositories/blockRepository';

export class ProcessBlockCommand {
  constructor(public blockList: number[]) {}
}

export class ProcessBlockCommandHandler {
  constructor(
    private readonly blockRepository: BlockRepository,
    private readonly blockchainGateway: BlockchainGateway,
  ) {}
  async handle(command: ProcessBlockCommand): Promise<void> {
    command.blockList.forEach(async (block) => {
      const blockDetails = await this.blockchainGateway.retrieveBlockDetails(
        block,
      );

      this.blockRepository.save(blockDetails);
    });
  }
}
