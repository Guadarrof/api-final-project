import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import messageRoutes from "./src/routes/messages.routes.js";
import productRoutes from "./src/routes/product.routes.js";
import imagesRoutes from "./src/routes/images.routes.js"

import { dbConnection } from "./src/database/dbConnection.js";



const server = express();
dotenv.config();

const storeApi = async () => {
  
  await dbConnection();

  server.use(express.json());
  server.use(cors())

  server.use('/public', express.static(`./temp/imgs`))

  server.use("/api/products", productRoutes);

  server.use("/images", imagesRoutes)

  server.use("/api/messages", messageRoutes);

  server.listen(process.env.PORT, () =>
    console.log("El servidor esta corriendo correctamente en el puerto", process.env.PORT)
  );
};

storeApi()