import { GrpcServer, wait } from '@orwoods/networking';
import { IOrdersServer, IOrdersService, OrdersService } from '../proto/generated/ordersService_grpc_pb';
import { GetOrderResponse } from '../proto/generated/ordersService_pb';

export class Server extends GrpcServer <IOrdersServer, IOrdersService> {
  public constructor () {
    super(OrdersService, {
      getOrder: async (call, callback) => {
        console.warn(new Date(), 'Request from the client:', {
          id: call.request.getOrderId(),
        });

        const order = new GetOrderResponse();
        order.setStatus('finished');

        callback(null, order);
      },
    });
  }

  public async getProps () {
    return Promise.resolve({
      host: '127.0.0.1',
      port: 55306,
      tls: false,
    });
  }
}
