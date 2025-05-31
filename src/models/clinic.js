"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Clinic.hasMany(models.MemberOfClinic, {
        foreignKey: "idClinic",
        sourceKey: "id",
      });
      Clinic.hasMany(models.SharePatient, {
        foreignKey: "idSharedPatientOfClinic",
        sourceKey: "id",
      });
      Clinic.hasMany(models.Patient, {
        foreignKey: "idPatientOfClinic",
        sourceKey: "id",
      });
      Clinic.hasMany(models.RoomOfClinic, {
        foreignKey: "idClinicRoom",
        sourceKey: "id",
      });
      Clinic.hasMany(models.ServicesOfClinic, {
        foreignKey: "idClinicService",
        sourceKey: "id",
      });
      Clinic.hasMany(models.StatusOfClinic, {
        foreignKey: "idClinicStatus",
        sourceKey: "id",
      });
      Clinic.hasMany(models.Schedule, {
        foreignKey: "idClinicSchedule",
        sourceKey: "id",
      });
    }
  }
  Clinic.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      nameClinic: DataTypes.STRING,
      emailClinic: DataTypes.STRING,
      phoneNumberClinic: DataTypes.STRING,
      avatarClinic: DataTypes.STRING,
      addressClinic: DataTypes.STRING,
      description: DataTypes.STRING,
      encryptedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Clinic",
    }
  );
  return Clinic;
};
