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
    }
  }
  Cajas.init({
    id:{
      type:DataTypes.BIGINT,
      primaryKey:true,
      autoIncrement:true
    },
    saldo_final: DataTypes.NUMBER,
    saldo_inicial: DataTypes.NUMBER,
    total_ingresos: DataTypes.NUMBER,
    total_egresos: DataTypes.NUMBER,
    fecha_apertura: DataTypes.TIME,
    fecha_cierre: DataTypes.TIME,
    usuario_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "usuario",
        key: "id"
      
      }}
  
  }, {
    sequelize,
    modelName: 'Cajas',
    timestamps:false
  });
 module.exports= Cajas;
