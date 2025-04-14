'use strict';

  const { Model, DataTypes } = require("sequelize");
  const sequelize = require("../src/config/database.js"); // Asegúrate de importar la conexión
  
  class Ventas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ventas.hasMany(models.detalle_ventas,{foreignKey:"venta_id",as:"detalles"})
      Ventas.belongsTo(usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario'
    });
    }
  }
  Ventas.init({
    id:{
      type:DataTypes.BIGINT,
      autoIncrement:true,
      primaryKey:true
    },
    total_venta: DataTypes.FLOAT,
    fecha_venta: DataTypes.DATE,
    cliente_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "clientes",
        key: "id"
      }
    },
    usuario_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "usuario",
        key: "id"
      }
      
    },
    almacen_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "almacen",
        key: "id"
      }
      
    },
    metodo_pago:{
      type: DataTypes.STRING,
      allowNull:true
    },
    descripcion_pago:{
      type:DataTypes.TEXT,
      allowNull:true
    }

    
  }, {
    sequelize,
    modelName: 'Ventas',
    timestamps:false
  });
  module.exports=Ventas
