import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { WssModule } from '../../shared/gateways/wss.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
    ]),
    WssModule,
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    WssModule,
  ],
})
export class ProductModule { }
