import express from "express"
import { uploadProduct} from "../controller/productController.js";
import { body } from "express-validator";
import { validationErrorRes } from "../middleware/validations.js";

const route = express.Router()

route
    .post("/create", 
        [
            body("userName").isString().isLength({min:1}).withMessage("El nombre de usuario es requerido"),
            body("email").isEmail().withMessage("El email es requerido"),
            body("password")
            .isString().isLength({min:1}).withMessage("La password es requerida.")
            .bail()
            .isLength({ min: 8}).withMessage("La password debe tener al menos 8 caracteres."),
            validationErrorRes
        ],
     uploadProduct)

export default route;