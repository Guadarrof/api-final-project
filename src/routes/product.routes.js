import express from "express"
import { uploadProduct, getProducts, editProduct} from "../controller/productController.js";
import { body } from "express-validator";
import { validationErrorRes } from "../middleware/validations.js";
import upload from "../libs/storage.js";

const route = express.Router()

route
    .post("/", upload.single("image"), uploadProduct)
    .get("/", getProducts)
    .put ("/edit/:id", upload.single("image"), editProduct )
    // .delete("/delete/:id")
     
export default route;
