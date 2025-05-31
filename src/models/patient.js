"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.hasOne(models.History, {
        foreignKey: "idHistory",
        as: "histories",
        sourceKey: "id",
      });
      Patient.hasOne(models.ExtraOral, {
        foreignKey: "idExtraOral",
        as: "extraOrals",
        sourceKey: "id",
      });
      Patient.hasOne(models.IntraOral, {
        foreignKey: "idIntraOral",
        as: "intraOrals",
        sourceKey: "id",
      });
      Patient.hasOne(models.Radiography, {
        foreignKey: "idRadiography",
        as: "radiographies",
        sourceKey: "id",
      });
      Patient.hasOne(models.DiagnosisAndTreatment, {
        foreignKey: "idDiagnosisAndTreatment",
        as: "diagnosisAndTreatments",
        sourceKey: "id",
      });

      Patient.hasMany(models.LibraryImagePatient, {
        foreignKey: "idPatientImage",
        sourceKey: "id",
      });
      Patient.hasMany(models.ListOfIssue, {
        foreignKey: "idListOfIssue",
        sourceKey: "id",
      });
      Patient.hasMany(models.TreatmentPlan, {
        foreignKey: "idTreatmentPlan",
        sourceKey: "id",
      });
      Patient.hasMany(models.TreatmentHistory, {
        foreignKey: "idTreatmentHistory",
        sourceKey: "id",
      });
      Patient.hasMany(models.SharePatient, {
        foreignKey: "idSharedPatient",
        sourceKey: "id",
      });
      Patient.hasMany(models.Schedule, {
        foreignKey: "idPatientSchedule",
        sourceKey: "id",
      });
      Patient.hasMany(models.Discussion, {
        foreignKey: "idRoomDiscussionOfPatient",
        sourceKey: "id",
      });
      Patient.hasMany(models.ActivityHistory, {
        foreignKey: "idPatientHistory",
        sourceKey: "id",
      });

      Patient.belongsTo(models.Doctor, {
        foreignKey: { name: "idPatientOfDoctor", allowNull: false },
        targetKey: "id",
      });
      Patient.belongsTo(models.Clinic, {
        foreignKey: { name: "idPatientOfClinic", allowNull: false },
        targetKey: "id",
      });
    }
  }
  Patient.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      idPatientOfDoctor: DataTypes.UUID,
      idPatientOfClinic: DataTypes.UUID,
      fullName: DataTypes.STRING,
      gender: DataTypes.STRING,
      birthday: DataTypes.DATE,
      consulationDate: DataTypes.DATE,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      chiefcomplaint: DataTypes.STRING,
      note: DataTypes.STRING,
      updateByDoctor: DataTypes.STRING,
      isEncrypted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
