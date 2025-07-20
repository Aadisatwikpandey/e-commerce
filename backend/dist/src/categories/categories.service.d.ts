import { PrismaService } from '../prisma.service';
import { Category } from '@prisma/client';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllCategories(): Promise<Category[]>;
}
