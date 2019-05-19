import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {

    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>,
    ) { }

    async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {

        const PRODUCT = new this.productModel(createProductDTO);
        return await PRODUCT.save();
    }

    async getProduct(productID: string): Promise<Product> {
        const PRODUCT = await this.productModel.findById(productID);
        return PRODUCT;
    }

    async getProducts(): Promise<Product[]> {
        const PRODUCTS = await this.productModel.find();
        return PRODUCTS;
    }

    async updateProduct(productID: string, createProductDTO: CreateProductDTO): Promise<Product> {
        const UPDATED_PRODUCT = await this.productModel.findByIdAndUpdate(productID, createProductDTO, { new: true });
        return UPDATED_PRODUCT;
    }

    async deleteProduct(productID: string): Promise<Product> {
        const DELETED_PRODUCT = await this.productModel.findByIdAndDelete(productID);
        return DELETED_PRODUCT;
    }
}
