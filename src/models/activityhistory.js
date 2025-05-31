"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ActivityHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ActivityHistory.belongsTo(models.Patient, {
        foreignKey: { name: "idPatientHistory", allowNull: false },
        targetKey: "id",
      });
      ActivityHistory.belongsTo(models.Doctor, {
        foreignKey: { name: "idDoctorHistory", allowNull: false },
        targetKey: "id",
      });
    }
  }
  ActivityHistory.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      idPatientHistory: DataTypes.UUID,
      idDoctorHistory: DataTypes.UUID,
      fileChange: DataTypes.STRING,
      contentChange: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ActivityHistory",
    }
  );
  return ActivityHistory;
};
