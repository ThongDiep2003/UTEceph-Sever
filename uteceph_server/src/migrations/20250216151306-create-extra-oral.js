'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ExtraOrals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idExtraOral: {
        unique: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        references:{
          model: {
            tableName: 'Patients',
            name: 'idExtraOral',
          },
          key: 'id',
        }
      },
      faceAsymetry: {
        type: Sequelize.STRING
      },
      chin: {
        type: Sequelize.STRING
      },
      lipCompetence: {
        type: Sequelize.STRING
      },
      lipPostureApart: {
        type: Sequelize.STRING
      },
      normalNaresExposure: {
        type: Sequelize.STRING
      },
      alarBaseWidth: {
        type: Sequelize.STRING
      },
      lipWidth: {
        type: Sequelize.STRING
      },
      verticalDimensions: {
        type: Sequelize.STRING
      },
      overallProfile: {
        type: Sequelize.STRING
      },
      lowerThirdProfile: {
        type: Sequelize.STRING
      },
      nasolabialAngle: {
        type: Sequelize.STRING
      },
      softTissuePogonion: {
        type: Sequelize.STRING
      },
      mandibularPlaneAngle: {
        type: Sequelize.STRING
      },
      obliqueAnalysis: {
        type: Sequelize.STRING
      },
      teethDisplay: {
        type: Sequelize.STRING
      },
      gingivalDisplayLevel: {
        type: Sequelize.STRING
      },
      incisalDisplayMaxillary: {
        type: Sequelize.STRING
      },
      incisalDisplayMandibular: {
        type: Sequelize.STRING
      },
      smileArc: {
        type: Sequelize.STRING
      },
      restPositionIncisalDisplay: {
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
    await queryInterface.dropTable('ExtraOrals');
  }
};