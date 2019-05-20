import { Document } from 'mongoose';

/**
 * Users Interface
 * ================
 * Extended from Products Schema
 */
export interface Product extends Document {
    readonly name: string;
    readonly description: string;
    readonly imageURL: string;
    readonly price: number;
    readonly createdAt: Date;
}
