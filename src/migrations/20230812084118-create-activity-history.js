"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ActivityHistories", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      idPatientHistory: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Patients",
            name: "idPatientHistory",
          },
          key: "id",
        },
      },
      idDoctorHistory: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Doctors",
            name: "idDoctorHistory",
          },
          key: "id",
        },
      },
      fileChange: {
        type: Sequelize.STRING,
      },
      contentChange: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ActivityHistories");
  },
};
