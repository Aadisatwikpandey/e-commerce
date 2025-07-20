import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '@prisma/client';
import { AuthGuard } from '../auth/auth/auth.guard';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.getProductById(Number(id));
  }

  @UseGuards(AuthGuard)
  @Post()
  async createProduct(@Body(new ValidationPipe()) createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body(new ValidationPipe()) updateProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.updateProduct(Number(id), updateProductDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<Product> {
    return this.productsService.deleteProduct(Number(id));
  }
}
