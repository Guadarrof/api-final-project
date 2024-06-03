import fs from "fs";

import { Product } from "../models/products.js";

import { Images } from "../models/images.js";

export const uploadProduct = async (req, res) => {
  const { body, file } = req;
  try {
    if (!file) {
      return res.status(400).json({
        ok: false,
        msg: "La foto es requerida",
      });
    }

    const imageBuffer = fs.readFileSync(`./temp/imgs/${file.filename}`);

    const image = await Images.create({
      fileName: file.filename,
      img: {
        data: imageBuffer,
        contentType: "image/png",
      },
    });

    if (!image) {
      return res.status(400).json({
        ok: false,
        msg: "No se pudo guardar la imagen",
      });
    }

    const product = await Product.create({
      ...body,
      imgUrl: `${process.env.BASE_URL}/images/${image._id}`,
    });

    fs.rm(`./temp/imgs/${file.fileName}`, (error) => {
      if (error) {
        console.log("No se ha podido eliminar el archivo");
      }
      console.log("El archivo ha sido eleminiado correctamente");
    });

    if (!product) {
      return res.status(400).json({
        ok: false,
        msg: "Error al crear el producto",
      });
    }
    return res.json({
      ok: true,
      product,
      msg: "Producto creado satisfactoriamente",
    });
  } catch (error) {
    console.log("Error al crear el producto");
    return res.status(500).json({
      ok: false,
      msg: "Ha habido un error en el servidor",
      error: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  const { search } = req.query;
  try {
    const searchBy = search ? { productName: new RegExp(search, "i") } : {};
    const products = await Product.find({
      ...searchBy,
      deletedAt: { $in: [null, undefined]},
    }).sort({ productName: 1 });

    res.json({
      ok: true,
      products,
    });
  } catch (error) {
    console.log("Error al obtener los productos");
    res.status(500).json({
      ok: false,
      msg: "Ha habido un error en el servidor",
      error: error.message,
    });
  }
};

export const editProduct = async (req, res) => {
  const { id } = req.params;
  const { body, file } = req;

  try {
    const product = await Product.findById(id);

    if (!product || product.deletedAt) {
      return res.status(404).json({
        ok: false,
        msg: "Producto no encontrado",
      });
    }

    let imageUrl = product.imgUrl;

    if (file) {
      const imageBuffer = fs.readFileSync(`./temp/imgs/${file.filename}`);

      const image = await Images.create({
        fileName: file.filename,
        img: {
          data: imageBuffer,
          contentType: "image/png",
        },
      });

      if (!image) {
        return res.status(400).json({
          ok: false,
          msg: "No se pudo guardar la imagen",
        });
      }

      fs.rm(`./temp/imgs/${file.fileName}`, (error) => {
        if (error) {
          console.log("No se ha podido eliminar el archivo");
        }
        console.log("El archivo ha sido eleminiado correctamente");
      });

      imageUrl = `${process.env.BASE_URL}/images/${image._id}`;
    }
    const productUpdated = await Product.findByIdAndUpdate(
      id,
      {
        ...body,
        imgUrl: imageUrl,
      },
      { new: true }
    );

    res.json({
      ok: true,
      product: productUpdated,
      msg: "El producto ha sido actualizado correctamente",
    });
  } catch (error) {
    console.log("Error al editar el producto");
    res.status(500).json({
      ok: false,
      msg: "Ha habido un error en el servidor",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
        const product = await Product.findById(id);
        if (!product){
            return res.status(404).json({
                ok: false,
                msg: "No se ha encontrado el producto",
                error: error.message,
              });

        }

        await Product.findByIdAndUpdate(id, {deletedAt: new Date()}, {new: true})

        res.json({
            ok: true,
            msg: "El producto ha sido eliminado"
        })

  } catch (error) {
    console.log("Error al eliminar el producto");
    res.status(500).json({
      ok: false,
      msg: "Ha habido un error en el servidor",
      error: error.message,
    });
  }
};
