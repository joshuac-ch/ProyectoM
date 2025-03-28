const Proveedor=require("../../models/proveedor")
const GetProveedor=async(req,res)=>{
    try{
        const getprove=await Proveedor.findAll()
        if(!getprove){
            return res.status(404).json({message:"No se encontro la tabla proveedor"})
        }
        res.status(200).json(getprove)
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const CreateProveedor=async(req,res)=>{
    try{
        const {telefono,ruc,correo,empresa,apellido,direccion,nombre}=req.body
        if(!telefono || !ruc|| !correo|| !empresa || !apellido|| !direccion|| !nombre){
           return res.status(404).json({message:"Falta rellenar columnas"})
        }
        const Createprove=await Proveedor.create({
            telefono,
            ruc,
            correo,
            empresa,
            apellido,
            direccion,
            nombre
        })
        res.status(200).json({message:"Se creo proveedor correctamente",Createprove})
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const ShowProveedor=async(req,res)=>{
    try{
        const {id}=req.params
        const FindProvee=await Proveedor.findByPk(id)
        if(!FindProvee){
            return res.status(404).json({message:"no se encontro el id"})
        }
        res.status(200).json(FindProvee)         
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const UpdateProveedor=async(req,res)=>{
    try{
        const {id}=req.params
        const UpdateProvee=await Proveedor.findByPk(id)
        if(!UpdateProvee){
          return res.status(404).json({message:"No se encontro el id"})
        }
        const {telefono,ruc,correo,empresa,apellido,direccion,nombre}=req.body
        if(!telefono||!ruc||!correo||!empresa||!apellido||!direccion||!nombre){
            return res.status(404).json({message:"Faltan columnas rellenar"})
        }
        await UpdateProvee.update({
            telefono,
            ruc,
            correo,
            empresa,
            apellido,
            direccion,
            nombre
        })
        res.status(200).json({message:"Proveedor actualizado"})
        
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const DeleteProveedor=async(req,res)=>{
    try{
        const {id}=req.params
        const deleteProve=await Proveedor.destroy({where:{id}})
        if(!deleteProve){
            return res.status(404).json({mensaje:"No se enocntro el id"})
        }
        res.status(200).json({mensaje:"Se elimino el Proveedor correctamente"})
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
module.exports={GetProveedor,CreateProveedor,ShowProveedor,UpdateProveedor,DeleteProveedor}