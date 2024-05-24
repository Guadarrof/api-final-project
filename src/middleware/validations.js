import { validationResult } from "express-validator"


export const validationErrorRes = (req, res, next)=>{

    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()){
        const errorList = errors
            .array()
            .map(
                err=> ({[err.path]: err.msg})
            )
    return res.status(400).json(
        {ok: false,
        errors: errorList}
    )

    }else{
        next()
    }
}