const express =require("express");
const { createUser, getUsers }=require("../controllers/useController.js");
module.exports = router = express();

router.post("/", createUser); // Crear usuario
router.get("/s", getUsers); // Obtener usuarios


