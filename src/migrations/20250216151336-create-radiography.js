'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Radiographies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idRadiography: {
        unique: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        references:{
          model: {
            tableName: 'Patients',
            name: 'idRadiography',
          },
          key: 'id',
        }
      },
      sinuses: {
        type: Sequelize.STRING
      },
      condyles: {
        type: Sequelize.STRING
      },
      apparentPathology: {
        type: Sequelize.STRING
      },
      alveolarBoneHeights: {
        type: Sequelize.STRING
      },
      crownRootRatio: {
        type: Sequelize.STRING
      },
      others: {
        type: Sequelize.STRING
      },
      lateralCephalometricRadiography: {
        type: Sequelize.STRING
      },
      otherRadiography: {
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
    await queryInterface.dropTable('Radiographies');
  }
};