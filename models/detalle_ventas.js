'use strict';
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../src/config/database.js"); // Asegúrate de importar la conexión

  class detalle_ventas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      detalle_ventas.belongsTo(models.productos,{foreignKey:"producto_id"})
      detalle_ventas.belongsTo(models.ventas,{foreignKey:"venta_id"})
    }
  }
  detalle_ventas.init({
    cantidad: DataTypes.INTEGER,
    precio_unitario: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    producto_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "productos",
        key: "id"
      }},
      venta_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "ventas",
          key: "id"
        }}
  }, {
    sequelize,
    modelName: 'detalle_ventas',
    timestamps:false
  });
module.exports= detalle_ventas;
