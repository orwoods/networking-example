import { promisify } from 'util';
import { ClientConfig, GrpcClient } from '@orwoods/networking';
import { OrdersClient } from '../proto/generated/ordersService_grpc_pb';
import { GetOrderResponse, GetOrderRequest } from '../proto/generated/ordersService_pb';

export class Client extends GrpcClient <OrdersClient> {
  private getOrderFn!: (_args: GetOrderRequest) => Promise<GetOrderResponse>;

  constructor () {
    super(OrdersClient);
  }

  protected onInit () {
    this.getOrderFn = promisify(this.client.getOrder.bind(this.client));
  }

  public async getOrder (request: GetOrderRequest): Promise<GetOrderResponse | null> {
    return this.makeRequest(async () => this.getOrderFn(request), () => null);
  }

  public async getProps (): Promise<Partial<ClientConfig>> {
    return {
      host: '127.0.0.1',
      port: 55306,
      tls: false,
    };
  }
}
