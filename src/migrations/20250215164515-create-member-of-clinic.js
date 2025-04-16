'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MemberOfClinics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idClinic: {
        type: Sequelize.UUID,
        references:{
          model: {
            tableName: 'Clinics',
            name: 'idClinic'
          },
          key: 'id',
        },
        allowNull: false
      },
      idDoctor: {
        type: Sequelize.UUID,
        references:{
          model: {
            tableName: 'Doctors',
            name: 'idDoctor'
          },
          key: 'id',
        },
        allowNull: false
      },
      roleOfDoctor: {
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
    await queryInterface.dropTable('MemberOfClinics');
  }
};