'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LateralCephs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      idImageAnalysis: {
        type: Sequelize.UUID,
        references:{
          model: {
            tableName: 'LibraryImagePatients',
            name: 'idImageAnalysis',
          },
          key: 'id',
        }
      },
      markerPoints: {
        type: Sequelize.TEXT
      },
      scaleImage: {
        type: Sequelize.FLOAT
      },
      lengthOfRuler: {
        type: Sequelize.INTEGER
      },
      noteAnalysis: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LateralCephs');
  }
};