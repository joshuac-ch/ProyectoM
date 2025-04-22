'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      telefono: {
        type: Sequelize.STRING
      },
      correo: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING
      },
      dirrecion: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      tipo_cliente: {
        type: Sequelize.STRING
      },
      
    },{
      timestamps:false
    });
    await queryInterface.bulkInsert('Clientes',[{
      telefono:999320822,
      nombre:"Cliente",
      apellido:"Anonimo",
      correo:"nakanoi267@gmail.com",
      tipo_cliente:"-",
      dirrecion:"-",
    }])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clientes');
  }
};