import fs from "fs";

import {Product} from "../models/products.js";

import { Images } from "../models/images.js";


export const uploadProduct = async(req, res)=>{
    const {body, file} = req;
    try {
        if (!file){
           return res.status(400)
            .json({
                ok:false,
                msg:"La foto es requerida"
            });
        }

        const imageBuffer= fs.readFileSync(`./temp/imgs/${file.filename}`)
        
        const image = await Images.create({
            fileName:file.filename,
            img:{
                data: imageBuffer,
                contentType: "image/png"
            }
        })

        if (!image){
            return res.status(400)
             .json({
                 ok:false,
                 msg:"No se pudo guardar la imagen"
             });
         }
        
       const product= await Product.create({
        ...body,
        // imgUrl: `${process.env.BASE_URL}/public/${file.filename}`
        imgUrl: `${process.env.BASE_URL}/images/${image._id}}`
    });

        fs.rm(`./temp/imgs${file.fileName}`, error=>{
            if (error){
                console.log("No se ha podido eliminar el archivo")
            }
            console.log("El archivo ha sido eleminiado correctamente")
        })

       if (!product){
            return res.status(400)
                .json({
                    ok:false,
                    msg:"Error al crear el producto"
                })
       }
       return res.json({
        ok:true,
        product, 
        msg:"Producto creado satisfactoriamente"
    })
    } catch (error) {
        console.log("Error al crear el producto")
        return res.status(500)
            .json({
                ok:false,
                msg:"Ha habido un error en el servidor",
                error: error.message
            })
    }
}

export const getProducts = async (req, res)=>{
    try {
        const products = await Product
            .find()
            .sort({ productName: 1 });

        res.json({
            ok:true,
            products
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