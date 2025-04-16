'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('IntraOrals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idIntraOral: {
        unique: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        references:{
          model: {
            tableName: 'Patients',
            name: 'idIntraOral',
          },
          key: 'id',
        }
      },
      oralHygiene: {
        type: Sequelize.STRING
      },
      dentition: {
        type: Sequelize.STRING
      },
      caries: {
        type: Sequelize.STRING
      },
      missing: {
        type: Sequelize.STRING
      },
      wearingTeeth: {
        type: Sequelize.STRING
      },
      detalAldevelopment: {
        type: Sequelize.STRING
      },
      otherProblems: {
        type: Sequelize.STRING
      },
      archForm: {
        type: Sequelize.STRING
      },
      rightCanine: {
        type: Sequelize.STRING
      },
      rightMolar: {
        type: Sequelize.STRING
      },
      leftCanine: {
        type: Sequelize.STRING
      },
      leftMolar: {
        type: Sequelize.STRING
      },
      overjet: {
        type: Sequelize.STRING
      },
      overbite: {
        type: Sequelize.STRING
      },
      curveOfSpee: {
        type: Sequelize.STRING
      },
      cant: {
        type: Sequelize.STRING
      },
      posteriorRight: {
        type: Sequelize.STRING
      },
      posteriorLeft: {
        type: Sequelize.STRING
      },
      upperMidline: {
        type: Sequelize.STRING
      },
      lowerMidline: {
        type: Sequelize.STRING
      },
      deviate: {
        type: Sequelize.STRING
      },
      crCoDiscrepancy: {
        type: Sequelize.STRING
      },
      maximumMouthOpening: {
        type: Sequelize.STRING
      },
      guidanceOnProtrusion: {
        type: Sequelize.STRING
      },
      guidanceOnRight: {
        type: Sequelize.STRING
      },
      guidanceOnLeft: {
        type: Sequelize.STRING
      },
      musculature: {
        type: Sequelize.STRING
      },
      swallowingPattern: {
        type: Sequelize.STRING
      },
      historyOfTMD: {
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
    await queryInterface.dropTable('IntraOrals');
  }
};