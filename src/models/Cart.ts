import mongoose, { Schema, Document } from "mongoose";
import { UserI } from './User';
import { ProductI } from './Product';

export interface CartI extends Document {
    owner: UserI;
    products: any[];
    timestamp: Date;
}

const CartSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    products: {
        type: Array,
        default: []
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model<CartI>('Cart', CartSchema);