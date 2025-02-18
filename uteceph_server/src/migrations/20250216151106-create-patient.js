'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      idPatientOfDoctor: {
        allowNull: true,
        type: Sequelize.UUID,
        references:{
          model: {
            tableName: 'Doctors',
            name: 'idPatientOfDoctor'
          },
          key: 'id',
        },
      },
      idPatientOfClinic: {
        allowNull: true,
        type: Sequelize.UUID,
        references:{
          model: {
            tableName: 'Clinics',
            name: 'idPatientOfClinic'
          },
          key: 'id',
        },
      },
      fullName: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.DATE
      },
      consulationDate: {
        type: Sequelize.DATE
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      chiefcomplaint: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.STRING
      },
      updateByDoctor: {
        type: Sequelize.STRING
      },
      isEncrypted: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.addIndex('Patients', ['id'], { name: 'idx_patients_id' });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Patients');
  }
};