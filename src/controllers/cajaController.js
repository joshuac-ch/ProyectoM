const Cajas=require("../../models/cajas")
const GetCaja=async(req,res)=>{
    try{
        const data=await Cajas.findAll()
        if(!data){
            return res.status(404).json({message:"No se encontro esa tabla"})
        }
        res.status(200).json(data)
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const InsertCaja=async(req,res)=>{
    try{
        const {
            saldo_final,saldo_inicial,total_ingresos,total_egresos,
            fecha_apertura,fecha_cierre,usuario_id
        }=req.body
        if(!saldo_final||!saldo_inicial||!total_ingresos||!total_egresos||!fecha_apertura||!fecha_cierre||!usuario_id){
            return res.status(404).json({message:"No se rellenaron campos"})
        }
        const insert=await Cajas.create({
            saldo_final,
            saldo_inicial,
            total_ingresos,
            total_egresos,
            fecha_apertura,//"2025-03-27 13:39:42" FORMATO
            fecha_cierre,
            usuario_id
        })
        res.status(200).json({message:"Se creo la caja",insert})
    }catch(e){
        res.status(500).json({error:e.message})
    }
}

const UpdateCaja=async(req,res)=>{
    try{
        const {id}=req.params
        const {
            saldo_final,saldo_inicial,total_ingresos,total_egresos,
            fecha_apertura,fecha_cierre,usuario_id
        }=req.body
        const cajita=await Cajas.findByPk(id)
        if(!cajita){
            return res.status(404).json({message:"No se encontro esa caja"})
        }
        if(!saldo_final||!saldo_inicial||!total_ingresos||!total_egresos||!fecha_apertura||!fecha_cierre||!usuario_id){
            return res.status(404).json({message:"No se rellenaron campos"})
        }
        await cajita.update({
            saldo_final,
            saldo_inicial,
            total_ingresos,
            total_egresos,
            fecha_apertura,//"2025-03-27 13:39:42" FORMATO
            fecha_cierre,
            usuario_id
        })
        res.status(200).json(cajita)
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const ShowCaja=async(req,res)=>{
    try{
        const {id}=req.params
        const findbox=await Cajas.findByPk(id)
        if(!findbox){
            return res.status(404).json({message:"No se encontro ese id"})
        }
        res.status(200).json(findbox)
    }catch(e){
        res.status(500).json({message:"No se encontro el id de la caja"})
    }
}
const DeleteCaja=async(req,res)=>{
    try{
        const {id}=req.params
        const box=await Cajas.destroy({where:{id}})
        if(!box){
            return res.status(404).json({message:"No se encontro el id"})
        }
        res.status(200).json({message:"Se elimino correctamente la caja"})

    }catch(e){
        res.status(500).json({error:e.message})
    }
}

module.exports={GetCaja,InsertCaja,UpdateCaja,DeleteCaja,ShowCaja}