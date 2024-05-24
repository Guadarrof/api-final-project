import { Schema, model } from "mongoose";


const productSchema = new Schema({
    productName:{
        type: String,
        unique: true,
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
    img:{
        type: String
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
    }
})

export const Product = model("Product", productSchema)