'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('almacen', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      descripcion: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      
    },{
      timestamps:false,
            
    });
  await queryInterface.bulkInsert('almacen',[{
    descripcion:"Esta es la tienda 1",
    nombre:"Tienda de Abarrotes",
  }])
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('almacen');
  }
};