"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../src/config/database.js"); // Asegúrate de importar la conexión
//hola
class Usuario extends Model {
  static associate(models) {
    // Relaciones aquí (ejemplo con ventas)    
    Usuario.belongsTo(models.Almacen,{foreignKey:"almacen_id"})
    Usuario.hasMany(models.movimientos_producto,{foreignKey:"usuario_id"})
    //Usuario.hasMany(models.Venta, { foreignKey: "usuario_id" });
    Usuario.hasMany(models.cajas,{foreignKey:"usuario_id"})
    Usuario.hasMany(models.ventas,{foreignKey:"usuario_id"})
  }
}
  
Usuario.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false
    }
    ,
    correo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    direccion:{
      type:DataTypes.STRING,
      allowNull:false
    },
    almacen_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "almacen",
        key: "id"
      }
    }
  },
  {
    sequelize,
    modelName: "usuario",
    tableName: "usuario", // Asegura que la tabla se llame "usuarios"
    timestamps: false
  }
);

module.exports = Usuario; // Exporta directamente el modelo
