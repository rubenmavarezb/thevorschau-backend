import mongoose, { Schema, Document } from "mongoose";
import { ProductI } from './Product';
import { UserI } from './User'

export interface CartI extends Document {
    products: ProductI[];
    timestamp: Date;
    owner: UserI;
}

const CartSchema = new Schema({
    products: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
        default: []
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
})

export default mongoose.model<CartI>('Cart', CartSchema);