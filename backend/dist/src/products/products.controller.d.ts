import { ProductsService } from './products.service';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getAllProducts(): Promise<Product[]>;
    getProductById(id: string): Promise<Product | null>;
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    updateProduct(id: string, updateProductDto: CreateProductDto): Promise<Product>;
    deleteProduct(id: string): Promise<Product>;
}
