const express =require("express");
const { createUser, getUsers , updateUser, showUser, DeleteUser }=require("../controllers/useController.js");
const {GetAlmacen,CreateAlmacen,ShowAlmacen,PutAlmacen,DestroyAlmacen}=require("../controllers/almacenController.js")
const {GetCategoria,CreateCate,ShowCate,UpdateCate,DeleteUpdate}=require("../controllers/categoriaController.js")
const {GetSubCategoria,CreateSubCategoria,ShowSubcategoria,UpdateSubcategoria,DeleSubcategoria}  =require('../controllers/subcategoriaController.js')
const {GetProveedor,CreateProveedor,ShowProveedor,UpdateProveedor,DeleteProveedor}=require("../controllers/proveedorController.js")
const {GetCLientes,CreateClient,showClient,UpdateCliente,DeleteCliente} =require("../controllers/clientesController.js")
const {GetProductos,InserProductos,ShowProductos,UpdateProductos,DeleteProducto} =require("../controllers/productosController.js")
const {GetCaja,InsertCaja,UpdateCaja,DeleteCaja,ShowCaja, CerrarCaja, RegistrarMovimiento,ObtenerMovimientosCaja}=require("../controllers/cajaController.js")
const {GetVentas,InsertVenta,UpdateVenta,ShowVenta,DeleteVenta}=require("../controllers/ventasController.js")
const {GetDetalle,InsertDetalle,UpdateDetalle,DeleteDetalle,ShowDetalle,InsertDetalleCompleto,DetalleEspecifico}=require("../controllers/detalleVentasController.js")
const {GetMovimiento,InsetMovimento,Showmovimiento,UpdateMovimiento,DestroyMovimiento}=require("../controllers/movimientosProductoController.js")
const {GetInventario, CrearInventario, ActualizarInventario,ShowInventario}=require("../controllers/inventarioController.js")
module.exports = router = express();
//--------------------------------------
//Usuario
//--------------------------------------
router.post("/usuario/c", createUser); // Crear usuario
router.get("/usuario/g", getUsers); // Obtener usuarios
router.put("/usuario/u/:id",updateUser);
router.get("/usuario/s/:id",showUser);
router.delete("/usuario/d/:id",DeleteUser)

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
//Inventario
//---------------------------------------
router.get("/inven/g",GetInventario)
router.post("/inven/c",CrearInventario)
router.get("/inven/s/:id",ShowInventario)
router.put("/inven/u/",ActualizarInventario)
//---------------------------------------
//Caja
//---------------------------------------
router.get("/caja/g",GetCaja)
router.post("/caja/c",InsertCaja)
router.put("/caja/u/:id",UpdateCaja)
router.get("/caja/s/:id",ShowCaja)
router.delete("/caja/d/:id",DeleteCaja)
router.put("/caja/cerrar/:tienda_id",CerrarCaja)
router.post("/caja/movimiento",RegistrarMovimiento)
router.get("/movimiento-caja/",ObtenerMovimientosCaja)
//---------------------------------------
//Ventasd
//---------------------------------------
router.get("/venta/g",GetVentas)
router.post("/venta/c",InsertVenta)
router.put("/venta/u/:id",UpdateVenta)
router.get("/venta/s/:id",ShowVenta)
router.delete("/venta/d/:id",DeleteVenta)
//---------------------------------------
//Detalle Venta
router.post("/detalle-venta-completo/",InsertDetalleCompleto) //Solo para boleta
router.get("/detalle-especifico/:venta_id",DetalleEspecifico) //Solo para boleta
//router.post("/detalle-venta-completo1/",crearVentaCompleta) //Solo para boleta
//---------------------------------------
router.get("/detalle/g",GetDetalle)
router.post("/detalle/c",InsertDetalle)
router.put("/detalle/u/:id",UpdateDetalle)
router.get("/detalle/s/:id",ShowDetalle)
router.delete("/detalle/d/:id",DeleteDetalle)
//---------------------------------------
//Detalle Venta
//---------------------------------------
router.get("/movimiento/g",GetMovimiento)
router.post("/movimiento/c",InsetMovimento)
router.get("/movimiento/s/:id",Showmovimiento)
router.put("/movimiento/u/:id",UpdateMovimiento)
router.delete("/movimiento/d/:id",DestroyMovimiento)
//