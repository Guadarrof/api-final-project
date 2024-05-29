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
        imgUrl: `${process.env.BASE_URL}/public/${file.filename}`
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

export const getProducts = async (req, res)=>{
    try {
        const uploadedProducts = await Product
            .find()
            // .sort({ productName: 1 });

        res.json({
            ok:true,
            uploadedProducts
        })
        
    } catch (error) {
        console.log("Error al obtener los productos")
        res.status(500)
            .json({
                ok:false,
                msg:"Ha habido un error en el servidor",
                error: error.message
            })
    }
}