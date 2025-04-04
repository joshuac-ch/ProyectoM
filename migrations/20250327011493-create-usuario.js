'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //conexion con almacenes ID
    await queryInterface.createTable('Usuario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      nombre:{
        type:Sequelize.STRING
      },
      apellido:{
        type:Sequelize.STRING
      },      
      correo: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      rol:{
        type:Sequelize.STRING
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
      }
      
    },{
      timestamps:false 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuario');
  }
};