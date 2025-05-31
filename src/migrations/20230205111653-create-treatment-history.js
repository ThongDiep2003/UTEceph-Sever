'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TreatmentHistories', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      idTreatmentHistory: {
        type: Sequelize.UUID,
        references:{
          model: {
            tableName: 'Patients',
            name: 'idTreatmentHistory',
          },
          key: 'id',
        }
      },
      currentStatus: {
        type: Sequelize.STRING
      },
      performedProcedures: {
        type: Sequelize.STRING
      },
      consultationDate: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('TreatmentHistories');
  }
};