import mongoose, { Schema, Document } from "mongoose";
//////////////////////////////////////////////////////
import { UserI } from './User';
import { HelperI } from './Helper';
import { Chat } from '../interfaces'

export interface HelpChatI extends Document {
    user: UserI;
    helper: HelperI;
    chat: Chat;
    timestamp: Date;
}

const HelpChatSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    helper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Helper',
        default: null
    },
    chat: {
        type: Object,
        default: null
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model<HelpChatI>('HelpChat', HelpChatSchema);