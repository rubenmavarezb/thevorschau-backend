import mongoose, { Schema, Document } from "mongoose";

export interface UserI extends Document {
    name: string;
    email: string;
    password: string;
}

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
})

export default mongoose.model<UserI>('User', UserSchema);