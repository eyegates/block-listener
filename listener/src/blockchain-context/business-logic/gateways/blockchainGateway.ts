export type BlockchainEvent = 'block' | 'error' | 'pending';

export interface BlockchainGateway {
  listenEvent(eventName: BlockchainEvent);
}
