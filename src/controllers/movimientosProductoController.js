const MovimientosProducto=require("../../models/movimientos_producto")
const GetMovimiento=async(req,res)=>{
    try{
        const movimiento= await MovimientosProducto.findAll()
        if(!movimiento){
            return res.status(404).json({message:"No se encontro esa tabla"})
        }
        res.status(200).json(movimiento)
    }catch(e){
        res.status(500).json({message:e.message})
    }
}
const InsetMovimento=async(req,res)=>{
    try{
        const {cantidad,fecha_movimiento,razon,tipo_movimiento,almacen_id,producto_id,usuario_id}=req.body
        if(!cantidad||!fecha_movimiento||!razon||!tipo_movimiento||!almacen_id||!producto_id||!usuario_id){
            return res.status(404).json({message:"No se completaron los campos"})
        }
        const movimiento=await MovimientosProducto.create({
            cantidad,fecha_movimiento,razon,tipo_movimiento,almacen_id,producto_id,usuario_id
        })
        res.status(200).json({message:"se creo correctamente",movimiento})
    }catch(e){
        res.status(500).json({message:e.message})
    }
}
const Showmovimiento=async(req,res)=>{
    try{
        const {id}=req.params
        const movimiento=await MovimientosProducto.findByPk(id)
        if(!movimiento){
            return res.status(404).json({message:"No se enocntro el id"})
        }
        res.status(200).json(movimiento)
    }catch(e){
        res.status(500).json({message:e.message})
    }
}
const UpdateMovimiento=async(req,res)=>{
    try{
        const {id}=req.params
        const movimiento=await MovimientosProducto.findByPk(id)
        if(!movimiento){
            return res.status(404).json({message:"No se encotrno ese id"})
        }
        const {cantidad,fecha_movimiento,razon,tipo_movimiento,almacen_id,producto_id,usuario_id}=req.body
        if(!cantidad||!fecha_movimiento||!razon||!tipo_movimiento||!almacen_id||!producto_id||!usuario_id){
            return res.status(404).json({message:"No se completaron los campos"})
        }
        await movimiento.update({
            cantidad,
            fecha_movimiento,
            razon,
            tipo_movimiento,
            almacen_id,
            producto_id,
            usuario_id
        })
        res.status(200).json(movimiento) 
    }catch(e){
        res.status(500).json({message:e.message})
    }
}
const DestroyMovimiento=async(req,res)=>{
    try{
        const {id}=req.params
        const deletem=await MovimientosProducto.destroy({where:{id}})
        if(!deletem){
            return res.status(404).json({message:"No se encontro el id"})
        }
        res.status(200).json({message:"Se elimino correctamente el movimiento de producto"})
    }catch(e){
        res.status(500).json({mensage:e.message})
    }
}
module.exports={GetMovimiento,InsetMovimento,Showmovimiento,UpdateMovimiento,DestroyMovimiento}