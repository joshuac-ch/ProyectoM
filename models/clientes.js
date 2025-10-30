'use strict';
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../src/config/database.js"); // Asegúrate de importar la conexión

  class Clientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Clientes.hasMany(models.ventas,{foreignKey:"cliente_id"})
    }
  }
  Clientes.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    telefono: {
      type: DataTypes.STRING
    },
    correo:   {
      type: DataTypes.STRING
    },
    apellido: {
      type: DataTypes.STRING
    },
    dirrecion:{
      type: DataTypes.STRING
    },
    nombre:   {
      type: DataTypes.STRING
    },
    tipo_cliente:{
      type: DataTypes.STRING
  }
}, {
    sequelize,
    modelName: 'clientes',
    timestamps:false
  }); 
module.exports = Clientes