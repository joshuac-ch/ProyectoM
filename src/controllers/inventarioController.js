const Inventario=require("../../models/inventario")
const Movimiento_Producto=require("../../models/movimientos_producto")
const GetInventario=async(req,res)=>{
    try{
        const inventario=await Inventario.findAll()
        if(!inventario){
            return res.status(404).json({message:"No se encontro la tabla"})
        }
        res.status(200).json(inventario)
    }catch(err){
        res.status(500).json({message:err})
    }
    
}
const CrearInventario=async(req,res)=>{
    try{
        //const cantidad_actual=200
        //const producto_id=21
        //const almacen_id=5
        const {cantidad_actual,producto_id,almacen_id,stock_minimo,stock_maximo}=req.body
    if(!cantidad_actual||!producto_id||!almacen_id){
        return res.status(404).json({message:"No se llenaron las columnas nesesarias"})
    }
    const create=await Inventario.create({
        cantidad_actual,
        producto_id,
        almacen_id,
        stock_maximo:cantidad_actual,
        stock_minimo,
        ultimo_movimiento:new Date()        
    })
    res.status(200).json(create)
    }catch(err){
        res.status(500).json({message:err})
    }
}
const ShowInventario=async(req,res)=>{
    try{
        const {id}=req.params
        const inventario=await Inventario.findOne({where:{id}})
        if(!inventario){
            return res.status(404).json({message:"No se encontro el id"})
        }
        res.status(200).json(inventario)

    }catch(err){
        res.status(500).json({message:err})
    }
}
const ActualizarInventario=async(req,res)=>{
    try{
        //const cantidad=50
        //const tipo_movimiento="venta"
        //const almacen_id=5
        //const producto_id=21
        //const usuario_id=1
        //const {id}=req.params
        const {cantidad,tipo_movimiento,almacen_id,producto_id,usuario_id}=req.body
        //const {producto_id,cantidad_actual,almacen_id,stock_maximo,stock_minimo,ultimo_movimiento}=req.body
        let buscarInventario=await Inventario.findOne({where:{producto_id,almacen_id}})
        const cantidadNumerica=parseInt(cantidad,10)
        if(!buscarInventario){
            return res.status(404).json({message:"No se encontro el inventario"})
        }
        let nueva_cantidad=parseInt(buscarInventario.cantidad_actual,10)
        //Si es venta
        if(tipo_movimiento==="venta"){
            if(nueva_cantidad<cantidadNumerica){
                return res.status(404).json({message:"Stock no suficinete para hacer venta"})
            }
            nueva_cantidad-=cantidadNumerica
        }
        //si es una compra se aumenta 
        else if(tipo_movimiento==="compra"){
            nueva_cantidad+=cantidadNumerica
        }
        else{
            return {message:"Tipo de movimiento invalido "}
        }
        // Actualizar inventario
        await buscarInventario.update({ cantidad_actual:nueva_cantidad, ultimo_movimiento: new Date() });

        //Registrar el movimiento en la tabla movimiento_producto
        await Movimiento_Producto.create({
            razon:tipo_movimiento==="venta"?"venta de producto nuevo":"Compra de stock",
            tipo_movimiento,
            almacen_id,
            producto_id,
            usuario_id,
            cantidad:cantidadNumerica,
            fecha_movimiento:new Date()

        })
        res.status(200).json({message:"operacion exitosa"})
    }catch(err){
        res.status(500).json({message:err})
    }
}

module.exports={GetInventario,CrearInventario,ActualizarInventario,ShowInventario}