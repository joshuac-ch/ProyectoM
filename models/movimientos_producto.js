'use strict';
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../src/config/database.js"); // Asegúrate de importar la conexión

  class movimientos_producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      movimientos_producto.belongsTo(models.Almacen,{foreignKey:"almacen_id"})
      movimientos_producto.belongsTo(models.movimientos_producto,{foreignKey:"producto_id"})
      movimientos_producto.belongsTo(models.usuario,{foreignKey:"usuario_id"})
    }
  }
  movimientos_producto.init({
    id:{
      type:DataTypes.BIGINT,
      primaryKey:true,
      autoIncrement:true

    },
    cantidad:         {type: DataTypes.INTEGER},
    fecha_movimiento: {type:DataTypes.DATE},
    razon:            {type:DataTypes.STRING},
    tipo_movimiento:  {type:DataTypes.STRING},
    almacen_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "almacen",
        key: "id"
      }
    },
    producto_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "productos",
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
    }

  }, {
    sequelize,
    modelName: 'movimientos_producto',
    timestamps:false,
    freezeTableName:true
    });
 module.exports=movimientos_producto;
