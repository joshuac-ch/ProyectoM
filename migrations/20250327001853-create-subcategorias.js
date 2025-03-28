'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subcategorias', {
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
      categoria_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "categoria",
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
    await queryInterface.dropTable('Subcategorias');
  }
};