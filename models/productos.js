'use strict';
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../src/config/database.js"); // Asegúrate de importar la conexión

  class Productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Productos.belongsTo(models.Almacen ,{foreignKey:"almacen_id"})
     Productos.belongsTo(models.Proveedor ,{  foreignKey:"proveedor_id"})
     Productos.belongsTo(models.Subcategorias ,{foreignKey:"subcategoria_id"})
     Productos.hasMany(models.movimientos_producto,{foreignKey:"producto_id"}) 
     Productos.hasMany(models.detalle_ventas,{foreignKey:"producto_id"})
     Productos.hasMany(models.inventario,{foreignKey:"producto_id"})
    }
  }
  Productos.init({
    id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true
        },
    cantidad_disponible:{
    type:DataTypes.NUMBER,
    allowNull:true,
    defaultValue:1
    },
    image:{
      type:DataTypes.STRING,
      defaultValue: null,
    },
    fecha_vencimiento:  {
      type:DataTypes.DATE,
      defaultValue: null,
     
    },
    precio_ingreso:     {
      type:DataTypes.FLOAT
    },
    precio_venta:       {
      type:DataTypes.FLOAT
    },
    descripcion:        {
      type:DataTypes.STRING,
      allowNull: true,
    },
    codigo_producto:    {
      type:DataTypes.STRING
    },   
    nombre:             {
      type:DataTypes.STRING
    },
    unidad_medida:      {
      type:DataTypes.STRING
    },almacen_id:{
      type:DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "almacen",
        key: "id"
      }            
    }
    ,proveedor_id:{
      type:DataTypes.BIGINT,
      allowNull: true,
      
      references: {
        model: "proveedor",
        key: "id"
      }

    }
    ,subcategoria_id:{
      type:DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "subcategoria",
        key: "id"
      }

    }

  }, {
    sequelize,
    modelName: 'Productos',
    timestamps:false
  });
module.exports=Productos