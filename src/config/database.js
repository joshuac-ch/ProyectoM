const  {Sequelize}= require("sequelize")
const  dotenv = require("dotenv")
dotenv.config()
// Configuración de la base de datos
module.exports = sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Desactiva logs de SQL   
});
