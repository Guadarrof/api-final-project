import express from "express"
import { createCart, editCart } from "../controller/cartController.js";

const route = express.Router()

route
    .post("/", createCart)
    .put("/edit/:id", editCart)

export default route;