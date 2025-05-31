"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Discussion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Discussion.belongsTo(models.Patient, {
        foreignKey: { name: "idRoomDiscussionOfPatient", allowNull: false },
        targetKey: "id",
      });
      Discussion.belongsTo(models.Doctor, {
        foreignKey: { name: "idDoctorSendMessage", allowNull: false },
        targetKey: "id",
      });
    }
  }
  Discussion.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      idRoomDiscussionOfPatient: DataTypes.UUIDV4,
      idDoctorSendMessage: DataTypes.UUIDV4,
      message: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Discussion",
    }
  );
  return Discussion;
};
