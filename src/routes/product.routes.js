import express from "express"
import { uploadProduct, getProducts} from "../controller/productController.js";
import { body } from "express-validator";
import { validationErrorRes } from "../middleware/validations.js";
import upload from "../libs/storage.js";

const route = express.Router()

route
    .post("/", 
        // [
        //     body("productName")
        //         .isString()
        //         .isLength({min:1})
        //         .withMessage("El nombre del producto es requerido"),
        //     body("price")
        //         .isNumeric()
        //         .isLength({min:1})
        //         .withMessage("El producto requiere un precio")
        //         .bail()
        //         .custom(value => value > 0)
        //         .withMessage("El precio debe ser mayor a 0"),
        //     body("shortDescription")
        //         .isString()
        //         .isLength({min:1})
        //         .withMessage("El producto requiere una descripcion")
        //         .bail()
        //         .isLength({min: 15, max:100})
        //         .withMessage("La descripcion debe contener entre 15 y 100 caracteres"),
        //     body("longDescription")
        //         .isString()
        //         .isLength({min:1})
        //         .withMessage("El producto requiere una descripcion")
        //         .bail()
        //         .isLength({min: 50, max:300})
        //         .withMessage("La descripcion debe contener entre 50 y 300 caracteres"),
        //     body("imgAlt")
        //         .isString()
        //         .isLength({min:1})
        //         .withMessage("La imagen del producto requiere descripcion"),
        //     body("category")
        //         .isString()
        //         .isLength({min:1})
        //         .withMessage("El producto requiere una categoria"),
        //     body("brand")
        //         .isString()
        //         .isLength({min:1})
        //         .withMessage("El producto requiere una marca"),
        //     body("stock")
        //         .isNumeric()
        //         .isLength({min:1})
        //         .withMessage("El producto requiere un valor")
        //         .bail()
        //         .custom(value => value > 0)
        //         .withMessage("El stock debe ser mayor a 0"),
        //     body("delivery")
        //         .optional()                
        //         .isBoolean()
        //         .withMessage("La entrega debe ser un valor booleano"),
        //     body("deletedAt")
        //         .optional()
        //         .isDate()
        //         .withMessage("La fecha de eliminación debe ser una fecha válida"),
        //         validationErrorRes
        //     ],
            upload.single("imgUrl"),
            uploadProduct)
    .get("/", getProducts)
     
export default route;