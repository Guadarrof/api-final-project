import { Schema, model } from "mongoose";


const productSchema = new Schema({
    productName:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    shortDescription:{
        type: String,
        required: true
    },
    longDescription:{
        type: String,
        required: true
    },
    imgUrl:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required:true
    },
    brand:{
        type: String,
        required:true
    },
    stock:{
        type: Number,
        required:true
    }, 
    delivery:{
        type: Boolean,
        default: false
    },
    deletedAt:{
        type: Date
    }
}, {timestamps: true})

export const Product = model("Product", productSchema)