import { Server } from './grpc/server';

// Server-side
(async () => {
  const server = new Server();
  await server.start();
})();
