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
        trim: true,
        maxlength:50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true, 
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    }
})

export default mongoose.model<UserI>('User', UserSchema);