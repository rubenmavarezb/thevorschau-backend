import mongoose, { Schema, Document } from "mongoose";
import { UserI } from './User'

export interface FavoritesI extends Document {
    products: any[];
    timestamp: Date;
    owner: UserI;
}

const FavoritesSchema = new Schema({
    products: {
        type: Array,
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

export default mongoose.model<FavoritesI>('Favorites', FavoritesSchema);