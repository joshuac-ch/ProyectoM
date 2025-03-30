const subcategoria=require('../../models/subcategorias')
const GetSubCategoria=async(req,res)=>{
    try{
        const Selectsubcate=await subcategoria.findAll()
        if(!Selectsubcate){
            return res.status(404).json({message:"no se encontro la tabla subcategoria"})
        }
        res.status(200).json(Selectsubcate)
    }catch(e){
        res.status(500).json({error:e.message})
    }
} 
const CreateSubCategoria=async(req,res)=>{
    try{
        const {nombre,descripcion,categoria_id}=req.body
        if(!nombre||!descripcion||!categoria_id){
            return res.status(404).json({message:"Faltan rellenar campos"})
        }
        const Csubcategoria=await subcategoria.create({
            nombre,
            descripcion,
            categoria_id
        })
        res.status(200).json({message:"subcategoria creada exitosamente",Csubcategoria})
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const ShowSubcategoria=async(req,res)=>{
    try{
        const {id}=req.params
        const showsubcate=await subcategoria.findByPk(id)
        if(!showsubcate){
            return res.status(404).json({message:"no se encontro este id"})
        }
        res.status(200).json(showsubcate)
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const UpdateSubcategoria=async(req,res)=>{
    try{
        const {id}=req.params
        const {descripcion,nombre,categoria_id}=req.body
        const UpdatesubCate=await subcategoria.findByPk(id)
        if(!UpdatesubCate){
            return res.status(404).json({message:"No se encontro el id"})
        }  //Revisar este a la ahora de hacer el cliente      
        if(!descripcion||!nombre||!categoria_id){
            return res.status(404).json({message:"Faltan datos por llenar"})
        }
        
        await UpdatesubCate.update({
            nombre,
            descripcion,
            categoria_id
        })
        res.status(200).json({message:"Datos actualizados",UpdatesubCate})
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const DeleSubcategoria=async(req,res)=>{
    try{
        const {id}=req.params
        const DeleteSubcate=await subcategoria.destroy({where:{id}})
        if(!DeleSubcategoria){
            return res.status(404).json({message:"no se encontro el id"})
        }
        res.status(200).json({message:"se borro correctamente la subcategoria"})
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
module.exports={GetSubCategoria,CreateSubCategoria,ShowSubcategoria,UpdateSubcategoria,DeleSubcategoria}