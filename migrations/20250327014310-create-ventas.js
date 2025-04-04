'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ventas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      total_venta: {
        type: Sequelize.FLOAT
      },
      fecha_venta: {
        type: Sequelize.DATE
      },cliente_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
              model: "clientes",
              key: "id"
            }
          },
          usuario_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
              model: "usuario",
              key: "id"
            },
            
          },
          almacen_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
              model: "almacen",
              key: "id"
            }
      }        
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ventas');
  }
};