'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('proveedor', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      telefono: {
        type: Sequelize.STRING
      },
      ruc: {
        type: Sequelize.STRING
      },
      correo: {
        type: Sequelize.STRING
      },
      empresa: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
     
    },{ freezeTableName: true});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('proveedor');
  }
};