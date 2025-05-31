'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ServicesOfClinics', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      idClinicService: {
        allowNull: false,
        type: Sequelize.UUID,
        references:{
          model: {
            tableName: 'Clinics',
            name: 'idClinicService',
          },
          key: 'id',
        }
      },
      nameService: {
        type: Sequelize.STRING
      },
      colorService: {
        type: Sequelize.STRING
      },
      priceService: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('ServicesOfClinics');
  }
};