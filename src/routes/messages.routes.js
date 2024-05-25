import express from "express"
import {sendMessage} from "../controller/messageController.js";
import { body } from "express-validator";
import { validationErrorRes } from "../middleware/validations.js";

const route = express.Router()

route.post("/", [
        body("contactName")
            .isString()
            .isLength({min:2})
            .withMessage("Se debe ingresar un nombre"),
        body("contactEmail")
            .isEmail()
            .withMessage("Se debe ingresar un email"),
        body("contactSubject")
            .isString(),
        body("contactMessage")
            .isString()
            .isLength({min:1})
            .withMessage("Se debe ingresar un mensaje")
            .bail()
            .isLength({min: 15, max:300})
            .withMessage("El mensaje debe contener entre 15 y 300 caracteres"),
            validationErrorRes
    ], sendMessage)

export default route;