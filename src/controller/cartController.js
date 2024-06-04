import { Cart } from "../models/cart.js";

export const createCart = async (req, res) => {
  try {
    const newCart = await Cart.create(req.body);
    res.json({
        ok:true, 
        cart: newCart
    })


  } catch (error) {
    console.log("Error al crear el carrito");
    res.status(500).json({
      ok: false,
      msg: "Ha habido un error en el servidor",
      error: error.message,
    });
  }
};
 