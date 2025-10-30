'use strict';
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../src/config/database.js"); // Asegúrate de importar la conexión

class Almacen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Almacen.hasMany(models.Usuario,{foreignKey:"almacen_id"})
      Almacen.hasMany(models.Productos,{foreignKey:"almacen_id"})
      Almacen.hasMany(models.movimientos_producto,{foreignKey:"almacen_id"})
      Almacen.hasMany(models.cajas,{foreignKey:"almacen_id"})
      Almacen.hasMany(models.inventario,{foreignKey:"almacen_id"})
      Almacen.hasMany(models.ventas,{foreignKey:"almacen_id"})
    }
  }

  Almacen.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },    
    descripcion: {
      type: DataTypes.STRING
    },
    nombre: {
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'almacen',
    timestamps:false,
    freezeTableName: true,
    
  });
  module.exports= Almacen;
