'use strict';
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../src/config/database.js"); // Asegúrate de importar la conexión

  class Subcategorias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subcategorias.belongsTo(models.Categoria, { foreignKey: "categoria_id" });
      Subcategorias.hasMany(models.Productos ,{foreignKey:"subcategoria_id"})
    }
  }
  Subcategorias.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },  
    descripcion: {
      type: DataTypes.STRING
    },
    nombre: {
      type: DataTypes.STRING
    },
    categoria_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "categoria",
        key: "id"
      }
    }
  },{
    sequelize,
    modelName: 'Subcategorias',
    timestamps:false
  });
  module.exports= Subcategorias;
