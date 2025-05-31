'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RoomOfClinics', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      idClinicRoom: {
        allowNull: false,
        type: Sequelize.UUID,
        references:{
          model: {
            tableName: 'Clinics',
            name: 'idClinicRoom',
          },
          key: 'id',
        }
      },
      nameRoom: {
        type: Sequelize.STRING
      },
      colorRoom: {
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
    await queryInterface.dropTable('RoomOfClinics');
  }
};