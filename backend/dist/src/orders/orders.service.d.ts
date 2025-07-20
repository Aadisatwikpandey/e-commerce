import { PrismaService } from '../prisma.service';
import { Order } from '@prisma/client';
interface CartItem {
    productId: number;
    quantity: number;
    price: number;
}
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    createOrder(items: CartItem[]): Promise<Order>;
}
export {};
