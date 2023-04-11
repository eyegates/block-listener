import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  ProcessBlockCommand,
  ProcessBlockCommandHandler,
} from '../../../../business-logic/usecases/process-block/processBlockCommandHandler';

@Controller('blocks')
export class BlocksController {
  constructor(
    private readonly processBlockCommandHandler: ProcessBlockCommandHandler,
  ) {}
  @EventPattern({ cmd: 'block' })
  async handleMessage(@Payload() data: number) {
    console.log(`Received event with data = ${data}`);

    await this.processBlockCommandHandler.handle(
      new ProcessBlockCommand([data]),
    );
  }
}
