import { Document } from 'mongoose';

/**
 * @interface Product
 * @description Interface of document schema: Product.
 */
export interface Product extends Document {
    readonly name: string;
    readonly description: string;
    readonly imageURL: string;
    readonly price: number;
    readonly createdAt: Date;
}
