'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detalle_ventas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize . BIGINT
      },
      cantidad: {
        type: Sequelize.INTEGER
      },
      precio_unitario: {
        type: Sequelize.INTEGER
      },
      subtotal: {
        type: Sequelize.INTEGER
      },producto_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
              model: "productos",
              key: "id"
            }},
            venta_id: {
              type: Sequelize.BIGINT,
              allowNull: false,
              references: {
                model: "ventas",
                key: "id"
              }}
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detalle_ventas');
  }
};