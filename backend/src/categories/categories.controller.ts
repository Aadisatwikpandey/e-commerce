import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '@prisma/client';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoriesService.getAllCategories();
  }
}
