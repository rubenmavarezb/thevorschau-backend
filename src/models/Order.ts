import mongoose, { Schema, Document } from "mongoose";
/////////////////////////////////////////////////////////////////////////////////////
import { ShippingAddress, BillingAddress, PaymentInformation } from '../interfaces';
/////////////////////////////////////////////////////////////////////////////////////
import { ProductI } from './Product';
/////////////////////////////////////////////////////////////////////////////////////

export interface OrderI extends Document {
    order: ProductI[];
    total: number;
    paymentinfo: PaymentInformation;
    shippingaddress: ShippingAddress;
    billingaddress: BillingAddress;
    buyer: string;
    state: string;
    created: Date;
}

export enum State {
    Pending = "PENDING",
    Canceled = "CANCELED",
    Completed = "COMPLETED"
}

const OrderSchema = new Schema({
    order: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    paymentinfo: {
        type: Object,
        required: true
    },
    shippingaddress: {
        type: Object,
        required: true
    },
    billingaddress: {
        type: Object,
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    state: {
        type: String,
        enum: State,
        default: State.Pending
    },
    created: {
        type:Date,
        default: Date.now()
    }
})

export default mongoose.model<OrderI>('Order', OrderSchema);