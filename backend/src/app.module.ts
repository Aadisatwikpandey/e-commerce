import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [ProductsModule, OrdersModule, AuthModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
