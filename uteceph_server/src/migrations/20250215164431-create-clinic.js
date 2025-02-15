'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clinics', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      nameClinic: {
        type: Sequelize.STRING
      },
      emailClinic: {
        type: Sequelize.STRING
      },
      phoneNumberClinic: {
        type: Sequelize.STRING
      },
      avatarClinic: {
        type: Sequelize.STRING
      },
      addressClinic: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      encryptedBy: {
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
    await queryInterface.dropTable('Clinics');
  }
};