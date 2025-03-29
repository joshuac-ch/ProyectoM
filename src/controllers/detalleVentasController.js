const DetalleVenta=require("../../models/detalle_ventas")
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
const InsertDetalle=async(req,res)=>{
    try{
        const {cantidad,precio_unitario,subtotal,producto_id,venta_id}=req.body
        if(!cantidad || !precio_unitario || !subtotal || !producto_id || !venta_id){
            return res.status(404).json({message:"Faltan columnas por llenar"})
        }
        const detale=await DetalleVenta.create({
            cantidad,
            precio_unitario,
            subtotal,
            producto_id,
            venta_id
        })
        res.status(200).json({message:"Se inserto el detalle correctamente",detale})
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
module.exports={GetDetalle,InsertDetalle,UpdateDetalle,ShowDetalle,DeleteDetalle}