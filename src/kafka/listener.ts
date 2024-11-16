import { KafkaConfig, KafkaConsumer } from '@orwoods/networking';
import { ConsumerConfig } from 'kafkajs';
import { Notification } from '../proto/generated/notification_pb';

export class Consumer extends KafkaConsumer {
  public async getConfig(): Promise<KafkaConfig> {
    return {
      clientId: 'example-consumer-app',
      brokers: ['10.10.0.1:25520'],
    };
  }

  public async getConsumerConfig(): Promise<ConsumerConfig> {
    return {
      groupId: 'example-group-id',
    };
  }

  public async onMessage(topic: string, data: Buffer | null): Promise<void> {
    if (data && topic === 'example') {
      const notification = Notification.deserializeBinary(data);

      console.warn('New message', {
        topic,
        subject: notification.getSubject(),
        body: notification.getBody(),
        url: notification.getUrl(),
      });
    } else {
      console.warn(`New message with unknown topic ${topic}`);
    }
  }
}
