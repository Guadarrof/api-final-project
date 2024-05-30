import {Images} from "../models/images.js"

export const getImage = async (req, res)=>{
    const { idImage } = req.params;
    try {
        const image = await Images.findById(idImage)
        const imgBuffer = Buffer.from(image.img.data)

        res.writeHead(200, {
            "Content-Type": image.img.contentType,
            "Content-Length": imgBuffer.length
        })
        res.end(imgBuffer)
        
    } catch (error) {
        res.status(500).send("No se puede acceder a la imagen")
    }
}