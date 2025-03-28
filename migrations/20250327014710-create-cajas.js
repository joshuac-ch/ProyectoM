'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cajas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      saldo_final: {
        type: Sequelize.INTEGER
      },
      saldo_inicial: {
        type: Sequelize.INTEGER
      },
      total_ingresos:{
        type:Sequelize.INTEGER
      },
      total_egresos: {
        type: Sequelize.INTEGER
      },
      fecha_apertura: {
        type: Sequelize.DATE
      },
      fecha_cierre: {
        type: Sequelize.DATE
      },
      usuario_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
              model: "usuario",
              key: "id"
            
            }}      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cajas');
  }
};