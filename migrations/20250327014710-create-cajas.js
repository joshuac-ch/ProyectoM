'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cajas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      saldo_final: {
        type: Sequelize.FLOAT
      },
      saldo_inicial: {
        type: Sequelize.FLOAT
      },
      total_ingresos:{
        type:Sequelize.FLOAT
      },
      total_egresos: {
        type: Sequelize.FLOAT
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
            
            }},
             tienda_id: {
                    type: Sequelize.BIGINT,
                    allowNull: false,
                    references: {
                      model: "almacen",
                      key: "id"
                    
                    }},
                          
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cajas');
  }
};