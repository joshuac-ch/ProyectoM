const express= require("express");
const cors =require("cors");
const dotenv= require("dotenv");
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
// Rutas
module.exports=app
