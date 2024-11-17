import { Server } from './grpc/server';
import { Client } from './grpc/client';
import { GetOrderRequest } from './proto/generated/ordersService_pb';

// Server-side
(async () => {
  const server = new Server();
  await server.start();
})();

// Client-side
setTimeout(async () => {
  const client = new Client();
  await client.connect();

  setInterval(async () => {
    const request = new GetOrderRequest();
    request.setId('example-id');

    try {
      const order = await client.getOrder(request);
      if (!order) {
        throw new Error('Unknown order');
      }

      console.warn(new Date(), 'Response from the server:', {
        id: request.getId(),
        status: order.getStatus(),
      });
    } catch (error) {
      console.warn(error);
    }
  }, 1000);
}, 1000);
