'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('inventario', {
      id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
          cantidad_actual: {
            type:Sequelize.INTEGER},
            producto_id: {
              type: Sequelize.BIGINT,
              allowNull: false,
              references: {
                model: "productos",
                key: "id"
              
              }},
             almacen_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                  model: "almacen",
                  key: "id"
                
                }},
          
          stock_minimo: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 5 }, // 🚨 Define cuándo alertar por bajo stock
          stock_maximo: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 100 }, // 🚀 Límite de almacenamiento
          ultimo_movimiento: { type: Sequelize.DATE, allowNull: true }, // 🕒 Guarda la última fecha de actualización
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('inventario');
  }
};