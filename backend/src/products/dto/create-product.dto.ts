import { IsString, IsNumber, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsUrl()
  imageUrl: string;

  @IsNumber()
  stock: number;

  @IsNumber()
  categoryId: number;
}
