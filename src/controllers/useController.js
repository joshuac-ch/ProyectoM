const Usuario= require("../../models/usuario");
const bcrypt= require("bcrypt");

// Crear usuario
const createUser = async (req, res) => {
    try {
        const { username, password,nombre,apellido,correo,telefono,dirrecion,rol,almacen_id } = req.body;
        if(!username || !password || !nombre || !apellido || !correo || !telefono || !dirrecion || !rol || !almacen_id ){
           return res.status(400).json({message:"Faltan columnas, los datos no estan completos"})
        }
        //Encriptar Contraseña
        //const hashContrasena=await bcrypt.hash(password,10)
        //Crear usuario
        const newUser = await Usuario.create({ 
            username,
            password,
            nombre,
            apellido,
            correo,
            telefono,
            dirrecion,
            rol,
            almacen_id  });
           /* const newUser = await Usuario.create({
                username: "test_user",
                password: hashedPassword,
                nombre: "Test",
                apellido: "User",
                correo: "test@example.com",
                telefono: "999999999",
                dirrecion: "Dirección de prueba",
                rol: "tester",
                almacen_id: 1
            });            
           */
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await Usuario.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // Obtenemos el ID del usuario desde los parámetros de la URL
        const { username, password, nombre, apellido, correo, telefono, dirrecion, rol, almacen_id } = req.body;

        // Buscar el usuario por ID
        const user = await Usuario.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }      
        
        // Actualizar usuario
        await user.update({
            username,
            password,
            nombre,
            apellido,
            correo,
            telefono,
            dirrecion,
            rol,
            almacen_id
        });

        res.status(200).json({ message: "Usuario actualizado correctamente", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const showUser=async(req,res)=>{
    try{
        const {id}=req.params
        //const { username, password, nombre, apellido, correo, telefono, dirrecion, rol, almacen_id } = req.body; 
        //encontrar usuario
        const user=await Usuario.findByPk(id);
        if(!user){
            return res.status(404).json({message:"hubo un erro no se encontro el usuario"})
        }
        res.status(200).json({user})
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
const DeleteUser=async(req,res)=>{
    try{
        const {id}=req.params;
        //eliminar un usuario
        const userDeleted=await Usuario.destroy({where:{id}})
        if(!userDeleted){
            return res.status(404).json({message:"no se encontro el id del usuario"})
        }
        return res.status(200).json("se elimino correctamente el usuario")
    }catch(e){
        res.status(500).json({error:e.message})
    }
}
//HACER EL SHOW 
module.exports={getUsers,createUser,updateUser,showUser,DeleteUser}
