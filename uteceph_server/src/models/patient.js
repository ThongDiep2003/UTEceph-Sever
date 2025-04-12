'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.hasOne(models.History, {foreignKey:'idHistory', sourceKey:'id'});
      Patient.hasOne(models.ExtraOral, {foreignKey:'idExtraOral', sourceKey:'id'});
      Patient.hasOne(models.IntraOral, {foreignKey:'idIntraOral', sourceKey:'id'});
      Patient.hasOne(models.Radiography, {foreignKey:'idRadiography', sourceKey:'id'});
      Patient.hasOne(models.DiagnosisAndTreatment, {foreignKey:'idDiagnosisAndTreatment', sourceKey:'id'});

      Patient.hasMany(models.ListOfIssue, {foreignKey:'idListOfIssue', sourceKey:'id'});
      Patient.hasMany(models.TreatmentPlan, {foreignKey:'idTreatmentPlan', sourceKey:'id'});
      Patient.hasMany(models.TreatmentHistory, {foreignKey:'idTreatmentHistory', sourceKey:'id'});
      Patient.hasMany(models.SharePatient, {foreignKey:'idSharedPatient', sourceKey:'id'});

      Patient.belongsTo(models.Doctor, {foreignKey:{name: 'idPatientOfDoctor', allowNull:false}, targetKey:'id'});
      Patient.belongsTo(models.Clinic, {foreignKey:{name: 'idPatientOfClinic', allowNull:false}, targetKey:'id'});
    }
  }
  Patient.init({
    idPatientOfDoctor: DataTypes.INTEGER,
    idPatientOfClinic: DataTypes.INTEGER,
    fullName: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthday: DataTypes.DATE,
    consulationDate: DataTypes.DATE,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    chiefcomplaint: DataTypes.STRING,
    note:DataTypes.STRING,
    updateByDoctor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};