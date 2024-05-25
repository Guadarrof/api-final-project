import express from "express";
import messageRoutes from "./src/routes/messages.routes.js";
import productRoutes from "./src/routes/product.routes.js"
import { dbConnection } from "./src/database/dbConnection.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const server = express();

const storeApi = async () => {
  
  await dbConnection();

  server.use(express.json());

  server.use(cors())

  server.use("/api/products", productRoutes);

  server.use("/api/messages", messageRoutes);

  server.listen(process.env.PORT, () =>
    console.log("el servidor esta corriendo correctamente en el puerto", process.env.PORT)
  );
};

storeApi()