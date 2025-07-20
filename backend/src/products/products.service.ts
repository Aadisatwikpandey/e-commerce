import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany({ include: { category: true } });
  }

  async getProductById(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { id: Number(id) }, include: { category: true } });
  }

  async createProduct(data: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({ data, include: { category: true } });
  }

  async updateProduct(id: number, data: CreateProductDto): Promise<Product> {
    return this.prisma.product.update({ where: { id: Number(id) }, data, include: { category: true } });
  }

  async deleteProduct(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id: Number(id) } });
  }
}
