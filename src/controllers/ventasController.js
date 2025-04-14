const Ventas=require("../../models/ventas")
const GetVentas=async(req,res)=>{
    try{
        const ventas=await Ventas.findAll()
        if(!ventas){
            return res.status(404).json({message:"No se encontro esa tabla "})
        }
        res.status(200).json(ventas)
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const InsertVenta=async(req,res)=>{
    try{
        const {total_venta,fecha_venta,cliente_id,usuario_id,almacen_id}=req.body
        if(!total_venta||!cliente_id||!usuario_id||!almacen_id){
            return res.status(404).json({message:"No se rellenaron campos"})
        }
        const insert=await Ventas.create({
            total_venta,
            fecha_venta:new Date(),
            cliente_id,
            usuario_id,
            almacen_id                       
        })
        res.status(200).json({message:"Se inserto la venta",insert})
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const UpdateVenta=async(req,res)=>{
    try{
        const {id}=req.params
        const {total_venta,fecha_venta,cliente_id,usuario_id,almacen_id}=req.body
        const venta=await Ventas.findByPk(id)
        if(!venta){
            return res.status(404).json({message:"No se encontro esa  venta"})
        }
        if(!total_venta||!cliente_id||!usuario_id){
            return res.status(404).json({message:"No se completaron los campos"})
        }
        await venta.update({
            total_venta,
            fecha_venta,
            cliente_id,
            usuario_id,
            almacen_id
        })
        res.status(200).json(venta)
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const ShowVenta=async(req,res)=>{
    try{
        const {id}=req.params
        const findShell=await Ventas.findByPk(id)
        if(!findShell){
            return res.status(404).json({message:"No se encontro el id"})
        }
        res.status(200).json(findShell)
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const DeleteVenta=async(req,res)=>{
    try{
        const {id}=req.params
        const deleteShell=await Ventas.destroy({where:{id}})
        if(!deleteShell){
            return res.status(404).json({message:"No se encontro el id de esa venta"})
        }
        res.status(200).json({message:"Se elimino la venta exitosamente"})
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
module.exports={GetVentas,InsertVenta,UpdateVenta,ShowVenta,DeleteVenta}