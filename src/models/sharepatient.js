"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SharePatient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SharePatient.belongsTo(models.Patient, {
        foreignKey: { name: "idSharedPatient", allowNull: false },
        targetKey: "id",
      });
      SharePatient.belongsTo(models.Doctor, {
        foreignKey: { name: "idSharedPatientOfDoctor", allowNull: true },
        targetKey: "id",
      });
      SharePatient.belongsTo(models.Clinic, {
        foreignKey: { name: "idSharedPatientOfClinic", allowNull: true },
        targetKey: "id",
      });
      SharePatient.belongsTo(models.Doctor, {
        foreignKey: { name: "idOwnerDoctor", allowNull: true },
        targetKey: "id",
      });
    }
  }
  SharePatient.init(
    {
      idSharedPatient: DataTypes.UUID,
      idSharedPatientOfDoctor: DataTypes.UUID,
      idSharedPatientOfClinic: DataTypes.UUID,
      idOwnerDoctor: DataTypes.UUID,
      roleOfOwnerDoctor: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "SharePatient",
    }
  );
  return SharePatient;
};
