'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //Falta realizar relacion de prodcutos con almacen,proveedor y subcategoria
    await queryInterface.createTable('Productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      cantidad_disponible: {
        type: Sequelize.INTEGER
      },
      fecha_vencimiento: {
        type: Sequelize.DATE
      },
      precio_ingreso: {
        type: Sequelize.INTEGER
      },
      precio_venta: {
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.STRING
      },
      codigo_producto: {
        type: Sequelize.STRING
      },
      image:{
        type:Sequelize.STRING
      },
      estado_producto: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      unidad_medida: {
        type: Sequelize.STRING
      },
      almacen_id:{
            type:Sequelize.BIGINT,
            allowNull: false,
            references: {
              model: "almacen",
              key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"            
      },
      proveedor_id:{
            type:Sequelize.BIGINT,
            allowNull: false,
            references: {
              model: "proveedor",
              key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"            
          },
          subcategoria_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
              model: "subcategorias",
              key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
          } 
      
    },{
      timestamps:false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Productos');
  }
};