'use strict';
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../src/config/database.js"); // Asegúrate de importar la conexión

  class movimientoCaja extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      movimientoCaja.belongsTo(models.cajas,{foreignKey:"caja_id"})
    }
  }
  movimientoCaja.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    caja_id: { type: DataTypes.INTEGER, allowNull: false },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    tipo: { type: DataTypes.ENUM("ingreso", "egreso"), allowNull: false },
    monto: { type: DataTypes.FLOAT, allowNull: false },
    descripcion: { type: DataTypes.STRING, allowNull: true },
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }
  , {
    sequelize,
    modelName: 'movimientoCaja',
    timestamps:false,
    freezeTableName:true
  });
module.exports= movimientoCaja;
