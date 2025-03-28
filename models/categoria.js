'use strict';
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../src/config/database.js"); // Asegúrate de importar la conexión

  class Categoria extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Categoria.hasMany(models.Subcategoria,{foreignKey:"categoria_id"}) // define association here
    }
  }
  Categoria.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },  
    descripcion: {
      type:DataTypes.STRING},
    nombre: {
      type:DataTypes.STRING}
  }, {
    sequelize,
    modelName: 'categoria',
    timestamps:false
  });
 module.exports= Categoria;
