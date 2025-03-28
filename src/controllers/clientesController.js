const Clientes=require("../../models/clientes")
const GetCLientes=async(req,res)=>{
    try{
        const cliente=await Clientes.findAll()
        if(!cliente){
            return res.status(404).json({message:"No se encontro la tabla"})
        }
        res.status(200).json(cliente)
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const CreateClient=async(req,res)=>{
    try{
        const {telefono,correo,apellido,dirrecion,nombre,tipo_cliente}=req.body
        if(!telefono||!correo||!apellido||!dirrecion||!nombre||!tipo_cliente){
            return res.status(404).json({message:"Faltan campos por llenar"})
        }
    const cliente=await Clientes.create({
        telefono,
        correo,
        apellido,
        dirrecion,
        nombre,
        tipo_cliente
    })
    res.status(200).json({message:"se creo el cliente",cliente})
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const showClient=async(req,res)=>{
    try{
        const {id}=req.params
        const cliente=await Clientes.findByPk(id)
        if(!cliente){
            return res.status(404).json({message:"No se encontro el id"})
        }
        res.status(200).json(cliente)
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const UpdateCliente=async(req,res)=>{
    try{
        const {id}=req.params
        const cliente=await Clientes.findByPk(id)
        if(!cliente){
            return res.status(404).json({message:"No se encontro el id"})
        }
        const {telefono,correo,apellido,dirrecion,nombre,tipo_cliente}=req.body
        if(!telefono||!correo||!apellido||!dirrecion||!nombre||!tipo_cliente){
            return res.status(404).json({message:"Faltan campos por llenar"})
        }
        await cliente.update({
            telefono,
            correo,
            apellido,
            dirrecion,
            nombre,
            tipo_cliente
        })
        res.status(200).json(cliente)
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const DeleteCliente=async(req,res)=>{
    try{
        const {id}=req.params
        const cliente=await Clientes.destroy({where:{id}})
        if(!cliente){
            return res.status(404).json({message:"No se encontro el id"})
        }
        res.status(200).json({message:"Se elimino correctamente el cliente"})
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
module.exports={GetCLientes,CreateClient,showClient,UpdateCliente,DeleteCliente}