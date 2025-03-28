const Categoria=require("../../models/categoria")
const GetCategoria=async(req,res)=>{
    try{
        const categoria=await Categoria.findAll()
        if(!categoria){
            return res.status(404).json({message:"hubo un error"})
        }
        res.status(200).json(categoria)
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const CreateCate=async(req,res)=>{
    try{
        const {nombre,descripcion}=req.body
        if(!nombre||!descripcion){
            return res.status(404).json({message:"faltan o se saltaron datos"})
        }
        const cate=await Categoria.create({
            nombre,
            descripcion
        })
        res.status(200).json({cate})
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const ShowCate=async(req,res)=>{
    try{
        const {id}=req.params
        const FindCate=await Categoria.findByPk(id)
        if(!FindCate){
            return res.status(404).json({message:"no se encontro la categoria"})
        }
        res.status(200).json(FindCate)
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const UpdateCate=async(req,res)=>{
    const {id}=req.params
    const {nombre,descripcion}=req.body
    const UpdateC=await Categoria.findByPk(id)
    if(!id){
        return res.status(404).json({message:"no se encontro el id"})
    }
    UpdateC.update({
        nombre,
        descripcion 
    })
    res.status(200).json({message:"se actualizo los datos",UpdateC})
}
const DeleteUpdate=async(req,res)=>{
    try{
        const {id}=req.params
        const DeleteCate=await Categoria.destroy({where:{id}})
        if(!DeleteCate){
            return res.status(404).json({message:"no se encontro el id"})
        }
        res.status(200).json({message:"se elimino correctamnete"})
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
module.exports={GetCategoria,CreateCate,ShowCate,UpdateCate,DeleteUpdate}