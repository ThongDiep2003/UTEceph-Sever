'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LibraryImagePatients', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      idPatientImage: {
        allowNull: false,
        type: Sequelize.UUID,
        references:{
          model: {
            tableName: 'Patients',
            name: 'idPatientImage',
          },
          key: 'id',
        }
      },
      linkImage: {
        type: Sequelize.STRING
      },
      typeImage: {
        type: Sequelize.INTEGER
      },
      consultationDate:{
        type: Sequelize.DATE
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
    await queryInterface.dropTable('LibraryImagePatients');
  }
};