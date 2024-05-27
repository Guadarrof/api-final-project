import {Message} from "../models/messages.js"

export const sendMessage = async(req, res)=>{
    const {body} = req;
    try {
       const message= await Message.create({...body})
       res.json({
        ok:true,
        message, 
        msg:"Mensaje enviado satisfactoriamente"
    })
    } catch (error) {
        res.status(500)
            .json({
                ok:false,
                msg:"Ha habido un error en el servidor",
                error: error.message
            })
    }
}

export const listMessages= async (req, res) => {
    const {page} = req.query
    const docsPerPage = 2;
    const skip = (parseInt(page-1)) * docsPerPage
    try {
        const messages = await Message.find()
            .skip(skip)
            .limit(docsPerPage)
            .sort ({contactEmail: 1})
    
        res.json({
            ok: true,
            messages
        })
        
    } catch (error) {
        res.status(500)
            .json({
                ok:false,
                msg:"Ha habido un error en el servidor"
            })
    }
}