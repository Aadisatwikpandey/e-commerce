import { PrismaService } from '../prisma.service';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllProducts(): Promise<Product[]>;
    getProductById(id: number): Promise<Product | null>;
    createProduct(data: CreateProductDto): Promise<Product>;
    updateProduct(id: number, data: CreateProductDto): Promise<Product>;
    deleteProduct(id: number): Promise<Product>;
}
