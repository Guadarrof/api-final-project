import mongoose from "mongoose";

export const dbConnection = async () =>{
    try {
        const mongoDB = await mongoose.connect(
            process.env.DB_URL_CONNECTION,
            {
                useNewURLParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Se conecto correctamente a la base de datos:", mongoDB.connections[0].name)

    } catch (error) {
        console.error("Error al conectar la base de datos")
        throw new Error(error)   
    }
}