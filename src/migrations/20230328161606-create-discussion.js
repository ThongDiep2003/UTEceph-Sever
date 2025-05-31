'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Discussions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      idRoomDiscussionOfPatient: {
        type: Sequelize.UUID,
        references:{
          model: {
            tableName: 'Patients',
            name: 'idRoomDiscussionOfPatient',
          },
          key: 'id',
        }
      },
      idDoctorSendMessage: {
        type: Sequelize.UUID,
        references:{
          model: {
            tableName: 'Doctors',
            name: 'idDoctorSendMessage',
          },
          key: 'id',
        }
      },
      message: {
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
    await queryInterface.addIndex('Discussions', ['id'], { name: 'idx_discussions_id' });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Discussions');
  }
};