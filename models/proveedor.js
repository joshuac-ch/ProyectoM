'use strict';
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../src/config/database.js"); // Asegúrate de importar la conexión

  class Proveedor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Proveedor.hasMany(models.Productos , {foreignKey:"proveedor_id"})
    }
  }
  Proveedor.init({
    id:{
      type: DataTypes.BIGINT,
      primaryKey:true,
      autoIncrement:true
    },
    telefono: {
      type: DataTypes.STRING
    },
    ruc:      {
      type: DataTypes.STRING
    },
    correo:   {
      type: DataTypes.STRING
    },
    empresa:  {
      type: DataTypes.STRING
    },
    apellido: {
      type: DataTypes.STRING
    },
    direccion:{
      type: DataTypes.STRING
    },
    nombre:   {
      type: DataTypes.STRING
    }
    
  }, {
    sequelize,
    modelName: 'Proveedor',
    timestamps:false,
    freezeTableName:true
  });
module.exports=Proveedor