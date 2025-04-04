"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../src/config/database.js"); // Asegúrate de importar la conexión
//hola
class User extends Model {
  static associate(models) {
    // Relaciones aquí (ejemplo con ventas)
    Usuario.hasMany(models.Venta, { foreignKey: "usuario_id" });
  }
}
  
User.init(
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
    }

  },
  {
    sequelize,
    modelName: "usuario",
    tableName: "usuarios", // Asegura que la tabla se llame "usuarios"
    timestamps: false
  }
);

module.exports = User; // Exporta directamente el modelo
