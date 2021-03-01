import mongoose, { Schema, Document } from "mongoose";

export interface ProductI extends Document {
    name: string;
    description: string;
    category: string,
    gtin: string;
    photos: string[];
    price: number,
    stock: number;
    quantity: number;
    created: Date
}

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    gtin: {
        type: String,
        required: true,
        trim: true,
    },
    photos: {
        type: [{type: String}],
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    stock: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model<ProductI>('Product', ProductSchema);