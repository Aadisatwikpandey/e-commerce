import { CategoriesService } from './categories.service';
import { Category } from '@prisma/client';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getAllCategories(): Promise<Category[]>;
}
