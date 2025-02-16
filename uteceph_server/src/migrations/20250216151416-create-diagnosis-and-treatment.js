'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DiagnosisAndTreatments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idDiagnosisAndTreatment: {
        unique: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        references:{
          model: {
            tableName: 'Patients',
            name: 'idDiagnosisAndTreatment',
          },
          key: 'id',
        }
      },
      diagnose: {
        type: Sequelize.STRING
      },
      prognosisAndNotes: {
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
    await queryInterface.dropTable('DiagnosisAndTreatments');
  }
};