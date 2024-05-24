import { Schema, model } from "mongoose";


const messageSchema = new Schema({
    contactName:{
        type: String,
        required: true
    },
    contactEmail:{
        type: String,
        unique: true,
        required: true
    },
    contactSubject:{
        type: String,
    },
    contactMessage:{
        type: String,
        required: true
    }
})

export const Message = model("Message", messageSchema)