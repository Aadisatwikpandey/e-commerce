import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Order, OrderItem } from '@prisma/client';

interface CartItem {
  productId: number;
  quantity: number;
  price: number;
}

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(items: CartItem[]): Promise<Order> {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await this.prisma.order.create({
      data: {
        total,
        orderItems: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { orderItems: true },
    });

    return order;
  }
}
