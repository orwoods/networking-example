import { Consumer } from './kafka/listener';

(async () => {
  const consumer = new Consumer();
  await consumer.subscribe(['example']);
})();
