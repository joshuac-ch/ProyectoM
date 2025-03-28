const express =require("express");
const { createUser, getUsers , updateUser, showUser, DeleteUser }=require("../controllers/useController.js");
const {GetAlmacen,CreateAlmacen,ShowAlmacen,PutAlmacen,DestroyAlmacen}=require("../controllers/almacenController.js")
const {GetCategoria,CreateCate,ShowCate,UpdateCate,DeleteUpdate}=require("../controllers/categoriaController.js")
const {GetSubCategoria,CreateSubCategoria,ShowSubcategoria,UpdateSubcategoria,DeleSubcategoria}  =require('../controllers/subcategoriaController.js')
const {GetProveedor,CreateProveedor,ShowProveedor,UpdateProveedor,DeleteProveedor}=require("../controllers/proveedorController.js")
const {GetCLientes,CreateClient,showClient,UpdateCliente,DeleteCliente} =require("../controllers/clientesController.js")
const {GetProductos,InserProductos,ShowProductos,UpdateProductos,DeleteProducto} =require("../controllers/productosController.js")
const {GetCaja,InsertCaja,UpdateCaja,DeleteCaja,ShowCaja}=require("../controllers/cajaController.js")
module.exports = router = express();
//--------------------------------------
//Usuario
//--------------------------------------
router.post("/", createUser); // Crear usuario
router.get("/s", getUsers); // Obtener usuarios
router.put("/userfind/:id",updateUser);
router.get("/show/:id",showUser);
router.delete("/delete/:id",DeleteUser)

//--------------------------------------
//Almacen
//--------------------------------------
router.get("/almacen/g",GetAlmacen)
router.post("/almacen/c",CreateAlmacen)
router.get("/almacen/show/:id",ShowAlmacen)
router.put("/almacen/u/:id",PutAlmacen)//FALTA PROBAR
router.delete("/almacen/d/:id",DestroyAlmacen)
//--------------------------------------
//Categoria
//--------------------------------------
router.get("/categoria/s",GetCategoria)
router.post("/categoria/c",CreateCate)
router.get("/categoria/u/:id",ShowCate)
router.put("/categoria/up/:id",UpdateCate)
router.delete("/categoria/d/:id",DeleteUpdate)
//---------------------------------------
//Subcategoria
//---------------------------------------
router.get("/subcategoria/g",GetSubCategoria)
router.post("/subcategoria/c",CreateSubCategoria) //revisar si corre en backend
router.get("/subcategoria/s/:id",ShowSubcategoria)
router.put("/subcategoria/u/:id",UpdateSubcategoria)//revisar si corre en backned
router.delete("/subcategoria/d/:id",DeleSubcategoria)
//---------------------------------------
//Proveedor
//---------------------------------------
router.get("/proveedor/g",GetProveedor)
router.post("/proveedor/c",CreateProveedor)
router.get("/proveedor/s/:id",ShowProveedor)
router.put("/proveedor/u/:id",UpdateProveedor)
router.delete("/proveedor/d/:id",DeleteProveedor)
//---------------------------------------
//Clientes
//---------------------------------------
router.get("/cliente/g",GetCLientes)
router.post("/cliente/c",CreateClient)
router.get("/cliente/s/:id",showClient)
router.put("/cliente/u/:id",UpdateCliente)
router.delete("/cliente/d/:id",DeleteCliente)
//---------------------------------------
//Productos
//---------------------------------------
router.get("/producto/g",GetProductos)
router.post("/producto/c",InserProductos)
router.get("/producto/s/:id",ShowProductos)
router.put("/producto/u/:id",UpdateProductos)
router.delete("/producto/d/:id",DeleteProducto)
//---------------------------------------
//Caja
//---------------------------------------
router.get("/caja/g",GetCaja)
router.post("/caja/c",InsertCaja)
router.put("/caja/u/:id",UpdateCaja)
router.get("/caja/s/:id",ShowCaja)
router.delete("/caja/d/:id",DeleteCaja)