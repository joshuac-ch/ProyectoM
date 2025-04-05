'use strict';
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../src/config/database.js"); // Asegúrate de importar la conexión

  class inventario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      inventario.belongsTo(models.productos,{foreignKey:"producto_id"})
      inventario.belongsTo(models.almacen,{foreignKey:"almacen_id"})
    }
  }
  inventario.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    cantidad_actual: {
      type:DataTypes.INTEGER},
      producto_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "productos",
          key: "id"
        }},
        almacen_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: "almacen",
            key: "id"
          }},
    
    stock_minimo: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 5 }, // 🚨 Define cuándo alertar por bajo stock
    stock_maximo: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 100 }, // 🚀 Límite de almacenamiento
    ultimo_movimiento: { type: DataTypes.DATE, allowNull: true }, // 🕒 Guarda la última fecha de actualización

  }, {
    sequelize,
    modelName: 'inventario',
    freezeTableName:true,
    timestamps:false
  });
 module.exports=inventario;
