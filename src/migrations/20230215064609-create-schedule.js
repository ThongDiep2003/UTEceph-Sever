'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      idPatientSchedule: {
        allowNull: false,
        type: Sequelize.UUID,
        references:{
          model: {
            tableName: 'Patients',
            name: 'idPatientSchedule',
          },
          key: 'id',
        }
      },
      idDoctorSchedule: {
        allowNull: false,
        type: Sequelize.UUID,
        references:{
          model: {
            tableName: 'Doctors',
            name: 'idDoctorSchedule',
          },
          key: 'id',
        }
      },
      idClinicSchedule: {
        allowNull: true,
        type: Sequelize.UUID,
        references:{
          model: {
            tableName: 'Clinics',
            name: 'idClinicSchedule',
          },
          key: 'id',
        }
      },
      idStatus: {
        allowNull: true,
        type: Sequelize.UUID,
        references:{
          model: {
            tableName: 'StatusOfClinics',
            name: 'idStatus',
          },
          key: 'id',
        }
      },
      idService: {
        allowNull: true,
        type: Sequelize.UUID,
        references:{
          model: {
            tableName: 'ServicesOfClinics',
            name: 'idService',
          },
          key: 'id',
        }
      },
      idRoom: {
        allowNull: true,
        type: Sequelize.UUID,
        references:{
          model: {
            tableName: 'RoomOfClinics',
            name: 'idRoom',
          },
          key: 'id',
        }
      },
      appointmentDate: {
        type: Sequelize.DATE
      },
      startTime: {
        type: Sequelize.TIME
      },
      endTime: {
        type: Sequelize.TIME
      },
      note: {
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
    await queryInterface.dropTable('Schedules');
  }
};