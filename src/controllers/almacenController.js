const Almacen=require("../../models/almacen")
const GetAlmacen=async(req,res)=>{
    try{
        
        const almacenes=await Almacen.findAll()
        if(!almacenes){
            return res.status(404).json({message:"no se encontraron datos"})
        }
        res.status(200).json(almacenes)
    }catch(e){
        res.status(500).json({erro:e.message})
    }
}
const CreateAlmacen=async(req,res)=>{
    try{
        const {descripcion,nombre} =req.body
        if(!descripcion || !nombre){
            return res.status(404).json({message:"faltaron datos"})
        }
        //const {descripcion,nombre}=req.body
        const newalmacen=await Almacen.create({
            descripcion,
            nombre
        })
        res.status(200).json(newalmacen)
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const ShowAlmacen=async(req,res)=>{
    try{
        const {id}=req.params
        const findAlmacen=await Almacen.findByPk(id)
        if(!findAlmacen){
            return res.status(404).json({message:"no se encontro el id"})
        }
        res.status(200).json(findAlmacen)
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const PutAlmacen=async(req,res)=>{
    try{
        const {id}=req.params
        const {nombre,descripcion}=req.body
        const almacen=await Almacen.findByPk(id)
        if(!almacen){
            return res.status(200).json({message:"Almacen no encontrado"})
        }
        await almacen.update({
            nombre,
            descripcion,
        }) 
        res.status(200).json({message:"Almacen actualizado"})
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const DestroyAlmacen=async(req,res)=>{
    try{
        const {id}=req.params
        const deleteAlmacen=await Almacen.destroy({where:{id}})
        if(!deleteAlmacen){
            return res.status(404).json({message:"no se encontro el id"})
        }
        res.status(200).json({message:"almacen eliminado"})
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
module.exports={GetAlmacen,CreateAlmacen,ShowAlmacen,PutAlmacen,DestroyAlmacen}