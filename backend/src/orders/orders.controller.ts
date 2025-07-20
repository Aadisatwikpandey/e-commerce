import { Controller, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() items: { productId: number; quantity: number; price: number }[]) {
    return this.ordersService.createOrder(items);
  }
}
