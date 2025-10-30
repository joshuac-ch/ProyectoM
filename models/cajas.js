'use strict';
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../src/config/database.js"); // Asegúrate de importar la conexión

  class Cajas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cajas.belongsTo(models.usuario,{"foreignKey":"usuario_id"})
      Cajas.belongsTo(models.almacen,{"foreignKey":"almacen_id"})
      Cajas.hasMany(models.movimientoCaja,{"foreignKey":"caja_id"})
    }
  }
  Cajas.init({
    id:{
      type:DataTypes.BIGINT,
      primaryKey:true,
      autoIncrement:true
    },
    saldo_final:   {type: DataTypes.FLOAT},
    saldo_inicial: {type:DataTypes.FLOAT},
    total_ingresos: {type:DataTypes.FLOAT,defaultValue:0},
    total_egresos:{type: DataTypes.FLOAT,defaultValue:0},
    fecha_apertura: DataTypes.DATE,
    fecha_cierre: DataTypes.DATE,
    usuario_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "usuario",
        key: "id"
      
      }},
      tienda_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "almacen",
          key: "id"
        
        }}
  
  }, {
    sequelize,
    modelName: 'cajas',
    timestamps:false
  });
 module.exports= Cajas;
