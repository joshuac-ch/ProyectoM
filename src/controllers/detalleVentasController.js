const DetalleVenta=require("../../models/detalle_ventas")
const Ventas = require("../../models/ventas")
const Producto=require("../../models/productos")
const {ActualizarInventario}=require("../controllers/inventarioController")
const inventario = require("../../models/inventario")
const GetDetalle=async(req,res)=>{
    try{
        const detalle=await DetalleVenta.findAll()
        if(!detalle){
            return res.status(404).json({message:"no se encontro el detalle de venta"})
        }
        res.status(200).json(detalle)
    }catch(e){
        res.status(500).json({message:e.message})
    }
}
const InsertDetalleCompleto = async (req, res) => {
    try {
        const {
            total_venta,
            cliente_id,
            usuario_id,
            almacen_id,
            productos // este es un array de productos con { producto_id, cantidad, precio_unitario }
        } = req.body;

        if (!productos || productos.length === 0) {
            return res.status(400).json({ message: "Debe incluir al menos un producto en la venta" });
        }

        // Crear la venta principal
        const ventita = await Ventas.create({
            total_venta,
            fecha_venta: new Date(),
            cliente_id,
            usuario_id,
            almacen_id,
        });

        // Registrar cada producto como detalle de venta
        const detallesCreados = [];

        for (const item of productos) {
            const { cantidad, precio_unitario, producto_id } = item;

            if (!cantidad || !precio_unitario || !producto_id) {
                return res.status(400).json({ message: "Faltan datos en uno de los productos" });
            }

            const subtotal = parseFloat(cantidad * precio_unitario);

            const nuevoDetalle = await DetalleVenta.create({
                cantidad,
                precio_unitario,
                subtotal,
                producto_id,
                venta_id: ventita.id
            });

            detallesCreados.push(nuevoDetalle);
            
            // Actualizar el inventario
            const cantidadInventario=await inventario.findOne({where:{almacen_id,producto_id}})
            
            if(!cantidadInventario){
                return res.status(404).json({message:"No hay inventario de esa tienda"})
            }
            if(cantidad<=cantidadInventario.cantidad_actual){
                await ActualizarInventario({
                    body: {
                        cantidad,
                        tipo_movimiento: "venta",
                        almacen_id,
                        producto_id,
                        usuario_id
                    }
                }, {
                    status: () => ({ json: () => {} }) // simulación de res
                });
            }else{
                return res.status(404).json({message:"No hay suficiente stock para realizar la venta"})
            }
            
        }

        res.status(200).json({
            message: "Venta y detalles registrados correctamente",
            Venta: ventita,
            Detalles: detallesCreados
        });

    } catch (err) {
        console.error("Error al registrar la venta completa:", err);
        res.status(500).json({ message: "Hubo un error", error: err.message });
    }
};
const DetalleEspecifico=async(req,res)=>{
    try{
        const {venta_id}=req.params
        const detalle=await DetalleVenta.findAll({where:{venta_id}})
        if(!detalle){
            return res.status(404).json({message:"No se encontro este detalle de venta"})
        }
        res.status(200).json(detalle)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
const InsertDetalleCompletov1=async(req,res)=>{
    try{
        const {
            total_venta,
            fecha_venta,
            cliente_id,
            usuario_id,
            almacen_id,
            //-------
            cantidad,
            precio_unitario,
            producto_id
        }=req.body
        if(!cantidad||!precio_unitario||!producto_id){
            return res.status(404).json({message:"Faltan columnas para llenar"})
        }
        const ventita=await Ventas.create({
            total_venta,
            fecha_venta:new Date(),
            cliente_id,
            usuario_id,
            almacen_id,
        })
        const subtotal=parseFloat(cantidad*precio_unitario)
        //Nuevo detalle con la venta
        const nuevoDetalle=await DetalleVenta.create({
            cantidad,
            precio_unitario,
            subtotal,
            producto_id,
            venta_id:ventita.id
        })
        await ActualizarInventario({
            body:{
                cantidad,
                tipo_movimiento: "venta",
                almacen_id,
                producto_id,
                usuario_id
            }
        }, {
            status: () => ({ json: () => {} }) // Simulación de response
        })
        res.status(200).json({message:"Detalle de venta insertado y stock actualizado correctamente",Venta:ventita,Detalle:nuevoDetalle})
    }catch(err){
        res.status(500).json({message:"Hubo un error",err})
    }
}
const InsertDetalle=async(req,res)=>{
    try{
        //const cantidad=5
        //const precio_unitario=12.5
        ////const subtotal=13
        //const producto_id=20
        //const venta_id=2
        //const almacen_id=5
        //const usuario_id=1
        const {cantidad,precio_unitario,subtotal,producto_id,venta_id}=req.body
        if(!cantidad || !precio_unitario ||!producto_id || !venta_id){
            return res.status(404).json({message:"Faltan columnas por llenar"})
        }
        // Obtener usuario_id y almacen_id de la tabla venta
        const venta = await Ventas.findOne({ where: { id: venta_id } });
        if (!venta) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }
        //subtotal=parseFloat(cantidad*precio_unitario) //se agrego esta linea
        //const almacen_id=5
        //const usuario_id=1
        const { almacen_id, usuario_id } = req.body;
        const detale=await DetalleVenta.create({
            cantidad,
            precio_unitario,
            subtotal,
            producto_id,
            venta_id
        })
        await ActualizarInventario({
            body:{
                cantidad,
                tipo_movimiento: "venta",
                almacen_id,
                producto_id,
                usuario_id
            }
        }, {
            status: () => ({ json: () => {} }) // Simulación de response
        })
        res.status(200).json({message:"Detalle de venta insertado y stock actualizado correctamente",detale})
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const UpdateDetalle=async(req,res)=>{
    try{
        const {id}=req.params
        const detalle=await DetalleVenta.findByPk(id)
        if(!detalle){
            return res.status(404).json({message:"No se encontro ese id"})
        }
        const {cantidad,precio_unitario,subtotal,producto_id,venta_id}=req.body
        if(!cantidad || !precio_unitario || !subtotal || !producto_id || !venta_id){
            return res.status(404).json({message:"Faltan columnas por llenar"})
        }
        await detalle.update({
            cantidad,
            precio_unitario,
            subtotal,
            producto_id,
            venta_id
        })
        res.status(200).json(detalle)
    }catch(e){
        res.status(500).json({mensaje:e.message})
    }
}
const ShowDetalle=async(req,res)=>{
    try{
        const {id}=req.params
        const search=await DetalleVenta.findByPk(id)
        if(!search){
            return res.status(404).json({message:"No se encontro ese id"})
        }
        res.status(200).json(search)
    }catch(e){
        res.status(500).json({messagge:e.message})
    }
}
const DeleteDetalle=async(req,res)=>{
    try{
        const {id}=req.params
        const detalle=await DetalleVenta.destroy({where:{id}})
        if(!detalle){
            return res.status(404).json({message:"No se encontro ese id"})
        }
        res.status(200).json({message:"Se elimino correctamente el detalle de venta"})
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
module.exports={GetDetalle,InsertDetalle,UpdateDetalle,ShowDetalle,DeleteDetalle,InsertDetalleCompleto,DetalleEspecifico}