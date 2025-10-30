const app= require("./app.js");
const  sequelize =require('./config/database.js');
const router = require("./routes/userRoutes.js");
app.use("/api/users", router);//Verficicar siempre esto es la ruta principal
// Conectar a MySQL http://localhost:4000/api/users/obtener
sequelize.authenticate()
    .then(() => console.log("Conectado a MySQL"))
    .catch(err => console.error("Hubo un error al conectar:", err));

const PORT = process.env.PORT ||7500;
app.listen(PORT, () => console.log(`Server2 corriendo en el siguiente puerto http://localhost:${PORT}`));
/*
import express from "express"
import { sequelize } from "./config/database.js";

const app = express();
app.use(express.json()); // Middleware para leer JSON


// Conectar a MySQL
sequelize.authenticate()
    .then(() => console.log("✅ Conectado a MySQL"))
    .catch(err => console.error("❌ Error al conectar:", err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
*/