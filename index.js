import express from "express";
import authRoutes from "./src/routes/auth.routes.js"
import { dbConnection } from "./src/database/dbConnection.js";
import cors from "cors";
import dotenv from "dotenv";

const storeApi = async () => {
  dotenv.config();
  
  await dbConnection();

  const server = express();

  server.use(express.json());

  server.use(cors())

  server.use("/api/auth", authRoutes);

  server.listen(process.env.PORT, () =>
    console.log("el servidor esta corriendo correctamente en el puerto", process.env.PORT)
  );
};

storeApi()