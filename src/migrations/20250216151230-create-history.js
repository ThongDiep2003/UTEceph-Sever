'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idHistory: {
        unique: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        references:{
          model: {
            tableName: 'Patients',
            name: 'idHistory',
          },
          key: 'id',
        }
      },
      dentalHistory: {
        type: Sequelize.STRING
      },
      medicalHistory: {
        type: Sequelize.STRING
      },
      cvmi: {
        type: Sequelize.STRING
      },
      otherMethodToEvaluate: {
        type: Sequelize.STRING
      },
      respiration: {
        type: Sequelize.STRING
      },
      habits: {
        type: Sequelize.STRING
      },
      familyHistory: {
        type: Sequelize.STRING
      },
      compliance: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Histories');
  }
};