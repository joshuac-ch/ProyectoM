const Productos=require("../../models/productos")
const GetProductos=async(req,res)=>{
    try{
        const dataProductos=await Productos.findAll()
        if(!dataProductos){
            return res.status(404).json({message:"No se encontro la tabla"})
        }
        res.status(200).json(dataProductos)
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const InserProductos=async(req,res)=>{
    try{
        const {cantidad_disponible,fecha_vencimiento,precio_ingreso,precio_venta,image,descripcion,codigo_producto,nombre,unidad_medida,proveedor_id,almacen_id,subcategoria_id}=req.body
        if(!cantidad_disponible||!image||!fecha_vencimiento||!precio_ingreso||!precio_venta||!descripcion||!codigo_producto||!nombre||!unidad_medida||!proveedor_id||!almacen_id||!subcategoria_id){
           return res.status(404).json({message:"Faltan columnas por llenar"})
        }
        const insert=await Productos.create({
            image,
            cantidad_disponible,
            fecha_vencimiento,
            precio_ingreso,
            precio_venta,
            descripcion,
            codigo_producto,           
            nombre,
            unidad_medida,
            proveedor_id,
            almacen_id,
            subcategoria_id
        })
        res.status(200).json({message:"se creo el producto exitosamente",insert})
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const ShowProductos=async(req,res)=>{
    try{
        const {id}=req.params
        const show=await Productos.findByPk(id)
        if(!show){
            return res.status(404).json({message:"no se encontro el id"})
        }
        res.status(200).json(show)
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const UpdateProductos=async(req,res)=>{
    try{
        const {id}=req.params
        const productos=await Productos.findByPk(id)
        if(!productos){
            return res.status(404).json({message:"No se encontro el id del producto"})
        }
        const {cantidad_disponible,fecha_vencimiento,precio_ingreso,
            precio_venta,descripcion,codigo_producto,
            nombre,unidad_medida,proveedor_id,almacen_id,subcategoria_id,image}=req.body
            
        if(!cantidad_disponible||!image||!fecha_vencimiento||!precio_ingreso||!precio_venta||!descripcion||!codigo_producto||!nombre||!unidad_medida||!proveedor_id||!almacen_id||!subcategoria_id){
           return res.status(404).json({message:"Faltan columnas por llenar"})
        }
        await productos.update({
            cantidad_disponible,
            image,
            fecha_vencimiento,
            precio_ingreso,
            precio_venta,
            descripcion,
            codigo_producto,
           
            nombre,
            unidad_medida,
            proveedor_id,
            almacen_id,
            subcategoria_id
        })
        res.status(200).json({message:"Se actualizo el producto"})
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const DeleteProducto=async(req,res)=>{
    try{
        const {id}=req.params
        const  borrarValorProducto=await Productos.destroy({where:{id}})
        if(!borrarValorProducto){
            return res.status(404).json({message:"No se encontro el id"})
        }
        res.status(200).json({message:"Se borro el producto correctamente"})
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
module.exports={GetProductos,InserProductos,ShowProductos,UpdateProductos,DeleteProducto}