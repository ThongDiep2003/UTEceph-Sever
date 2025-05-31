"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TreatmentHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TreatmentHistory.belongsTo(models.Patient, {
        foreignKey: { name: "idTreatmentHistory", allowNull: false },
        targetKey: "id",
      });
    }
  }
  TreatmentHistory.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      idTreatmentHistory: DataTypes.UUID,
      currentStatus: DataTypes.STRING,
      performedProcedures: DataTypes.STRING,
      consultationDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "TreatmentHistory",
    }
  );
  return TreatmentHistory;
};
