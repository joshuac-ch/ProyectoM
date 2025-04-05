'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movimientoCaja', {
          id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
          caja_id: { type: Sequelize.INTEGER, allowNull: false },
          usuario_id: { type:Sequelize.INTEGER, allowNull: false },
          tipo: { type: Sequelize.ENUM("ingreso", "egreso"), allowNull: false },
          monto: { type: Sequelize.FLOAT, allowNull: false },
          descripcion: { type: Sequelize.STRING, allowNull: true },
          fecha: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('movimientoCaja');
  }
};