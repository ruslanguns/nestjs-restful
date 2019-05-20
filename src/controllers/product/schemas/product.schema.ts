
import { Schema } from 'mongoose';

/**
 * Product Schema for MongoDB
 */
export const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    imageURL: String,
    price: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
