import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(items: {
        productId: number;
        quantity: number;
        price: number;
    }[]): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        total: number;
        status: string;
    }>;
}
