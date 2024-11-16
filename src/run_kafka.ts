import { Consumer } from './kafka/listener';
import { Producer } from './kafka/producer';
import { Notification } from './proto/generated/notification_pb';

(async () => {
  const consumer = new Consumer();
  const producer = new Producer();

  await consumer.subscribe(['example']);

  const object = new Notification();
  object.setSubject('Hello');
  object.setBody('World');
  object.setUrl('http://127.0.0.1');

  await producer.send({
    topic: 'example',
    acks: 1,
    messages: [{ object }],
  });
})();
