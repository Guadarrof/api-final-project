import {Product} from "../models/products.js"

export const uploadProduct = async(req, res)=>{
    const {body} = req;
    try {
       const product= await Product.create({
            ...body,
        })
       res.json({
        ok:true,
        product, 
        msg:"Producto creado satisfactoriamente"
    })
    } catch (error) {
        res.status(500)
            .json({
                ok:false,
                msg:"Ha habido un error en el servidor"
            })
    }
}

export const listProducts = async (req, res) => {
    const {page} = req.query
    const docsPerPage = 3;
    const skip = (parseInt(page-1)) * docsPerPage
    try {
        const products = await Product.find()
            .select("-password -__v")  
            .skip(skip)
            .limit(docsPerPage)
            .sort ({productName: 1})
    
        res.json({
            ok: true,
            products
        })
        
    } catch (error) {
        res.status(500)
            .json({
                ok:false,
                msg:"Ha habido un error en el servidor"
            })
    }
}