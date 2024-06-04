import { Schema, model } from "mongoose";


const CartSchema = new Schema({
    items:[{
        quantity:{
            type: Number,
            required: true
        },
        product:{
            type: Schema.Types.ObjectId,
            required: true
        }
    }
    ]
}, { timestamps: true})

export const Cart = model("Cart", CartSchema);