const Cajas=require("../../models/cajas")
const movimientoCaja = require("../../models/movimientocaja")
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
const GetCajaEspecificaXAlmacen=async(req,res)=>{
    try{
        const {tienda_id}=req.params
        const caja=await Cajas.findAll({where:{tienda_id}})        
        if(!caja){
            return res.status(404).json({message:"No se encontro la caja"})
        }
        res.status(200).json(caja)
    }catch(err){
        res.status(500).json({message:"Hubo un error no se encontro ese almacen"})
    }
}
const InsertCaja=async(req,res)=>{
    try{
        const {
            saldo_final,saldo_inicial,total_ingresos,total_egresos,
            fecha_apertura,fecha_cierre,usuario_id,tienda_id
        }=req.body
        if(!saldo_inicial||!usuario_id||!tienda_id){
            return res.status(404).json({message:"No se rellenaron campos"})
        }
        //----------------------
        //Comprobar que solo haya una caja abierta
        const cajaAbierta=await Cajas.findOne({where:{fecha_cierre:null,tienda_id}})
        if(cajaAbierta){
            return res.status(400).json({message:"Solo puede haber una caja abierta en cada tienda"})
        }
        const insert=await Cajas.create({
            saldo_inicial,
            saldo_final:saldo_inicial,           
            total_ingresos:0,
            total_egresos:0,
            fecha_apertura:new Date(),//"2025-03-27 13:39:42" FORMATO
            fecha_cierre:null,//se cerrara despues
            usuario_id,
            tienda_id,
        })
        res.status(200).json({message:"Se creo la caja",insert})
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
const CerrarCaja=async(req,res)=>{
    try{
        //id de la tienda NO DE LA CAJA
        const {
            tienda_id}=req.params;
        if(!tienda_id){
            return res.status(400).json({ message: "El ID de la tienda es obligatorio." });
        }
        const caja = await Cajas.findOne({
            where: { tienda_id, fecha_cierre: null }
        });
        if (!caja) {
            return res.status(404).json({ message: "No hay una caja abierta en esta tienda." });
        }
         // Calcular saldo final
         const saldoFinal = caja.saldo_inicial + caja.total_ingresos - caja.total_egresos;
         // Cerrar caja
        caja.saldo_final = saldoFinal;
        caja.fecha_cierre = new Date();
        
        await caja.save();
        res.status(200).json({
            message: "Caja cerrada con éxito.",
            caja
        });
    }catch(err){
        res.status(500).json({message:"Hubo un error en cerrar caja"})
    }
}

const UpdateCaja=async(req,res)=>{
    try{
        const {id}=req.params
        const {
            saldo_final,saldo_inicial,total_ingresos,total_egresos,
            fecha_apertura,fecha_cierre,usuario_id,tienda_id
        }=req.body
        const cajita=await Cajas.findByPk(id)
        if(!cajita){
            return res.status(404).json({message:"No se encontro esa caja"})
        }
        if(!saldo_final||!saldo_inicial||!total_ingresos||!total_egresos||!usuario_id||!tienda_id){
            return res.status(404).json({message:"No se rellenaron campos"})
        }
        await cajita.update({
            saldo_final,
            saldo_inicial,
            total_ingresos,
            total_egresos,
            fecha_apertura,//"2025-03-27 13:39:42" FORMATO
            fecha_cierre,
            usuario_id,
            tienda_id,
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
const RegistrarMovimiento = async (req, res) => {
    try {
        //const tienda_id=1
        //const usuario_id=1 
        //const monto=200
        //const tipo="ingreso"
        //const descripcion="un producto"
        const { tienda_id, usuario_id, monto, tipo, descripcion } = req.body; 

        if (!tienda_id || !usuario_id || !monto || !tipo) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        if (tipo !== "ingreso" && tipo !== "egreso") {
            return res.status(400).json({ message: "El tipo debe ser 'ingreso' o 'egreso'." });
        }

        // Buscar la caja abierta en la tienda
        const caja = await Cajas.findOne({ where: { tienda_id, fecha_cierre: null } });

        if (!caja) {
            return res.status(404).json({ message: "No hay una caja abierta en esta tienda." });
        }
         // 🔥 Convertir monto a número antes de sumarlo
         const montoNumerico = parseFloat(monto);

         // Verificar que el monto sea un número válido
         if (isNaN(montoNumerico)) {
             return res.status(400).json({ message: "El monto debe ser un número válido." });
         }
        // Actualizar el saldo de la caja
        if (tipo === "ingreso") {
            caja.total_ingresos += montoNumerico;
        } else {
            caja.total_egresos += montoNumerico;
        }

        await caja.save();

        // Registrar el movimiento en la tabla de historial
        const movimiento = await movimientoCaja.create({
            caja_id: caja.id,
            usuario_id,
            tipo,
            monto,
            descripcion
        });

        res.status(200).json({
            message: `Se registró correctamente el ${tipo}.`,
            movimiento
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar el movimiento en la caja." });
    }
};
const ObtenerMovimientosCaja = async (req, res) => {
    try {
        //const caja_id=7 
        //const { caja_id } = req.params;
        
        const movimientos = await movimientoCaja.findAll({
            //where: { caja_id },
            order: [["fecha", "DESC"]] // Ordenados del más reciente al más antiguo
        });

        res.status(200).json(movimientos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el historial de movimientos." });
    }
};


module.exports={GetCaja,InsertCaja,UpdateCaja,DeleteCaja,ShowCaja,CerrarCaja,RegistrarMovimiento,ObtenerMovimientosCaja,GetCajaEspecificaXAlmacen}