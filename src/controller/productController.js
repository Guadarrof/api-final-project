import {Product} from "../models/products.js"

export const uploadProduct = async(req, res)=>{
    const {body, file} = req;
    try {
        if (!file){
            res.status(400)
            .json({
                ok:false,
                msg:"La foto es requerida",
                error: error.message
            })
        }
       const product= await Product.create({
        ...body,
        img: `${process.env.BASE_URL}/public/${file.filename}`
    });
       if (!product){
            res.status(400)
                .json({
                    ok:false,
                    msg:"Error al crear el producto",
                    error: error.message
                })
       }
       res.json({
        ok:true,
        product, 
        msg:"Producto creado satisfactoriamente"
    })
    } catch (error) {
        console.log("Error al crear el producto")
        res.status(500)
            .json({
                ok:false,
                msg:"Ha habido un error en el servidor",
                error: error.message
            })
    }
}

export const listProducts = async (req, res) => {
    const {page} = req.query
    const docsPerPage = 3;
    const skip = (parseInt(page-1)) * docsPerPage
    try {
        const products = await Product.find()
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