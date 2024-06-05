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

export const editCart = async (req, res) =>{
  const {id} = req.params;

  try {
    const cartFound = await Cart.findById(id);
    if (!cartFound){
      return res.status(400).json({
        ok: false,
        msg: "No se ha encontrado el producto"
      })
    }

    const newCart = await Cart.findByIdAndUpdate(id, req.body, {new:true})
                              .populate({
                                path: "items.product",
                                model: "Product"
                            });

    res.json({
      ok:true,
      cart: newCart,
      msg: "El carrito ha sido actualizado"
    })

  } catch (error) {
    console.log("Error al editar el carrito");
    res.status(500).json({
      ok: false,
      msg: "Ha habido un error en el servidor",
      error: error.message,
    });
  }
}
 