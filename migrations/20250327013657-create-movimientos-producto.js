'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {//falta realizar las conexiones 
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movimientos_producto', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cantidad: {
        type: Sequelize.INTEGER
      },
      fecha_movimiento: {
        type: Sequelize.DATE
      },
      razon: {
        type: Sequelize.STRING
      },
      tipo_movimiento: {
        type: Sequelize.STRING
      },
      almacen_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
              model: "almacen",
              key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
          },
          producto_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                  model: "productos",
                  key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
              },
              usuario_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                  model: "usuario",
                  key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
              }
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('movimientos_producto');
  }
};