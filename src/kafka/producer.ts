import { KafkaProducer, KafkaConfig } from '@orwoods/networking';

export class Producer extends KafkaProducer {
  public async getConfig(): Promise<KafkaConfig> {
    return {
      brokers: ['10.10.0.1:25520'],
    };
  }
}
