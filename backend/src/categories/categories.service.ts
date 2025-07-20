import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getAllCategories(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }
}
