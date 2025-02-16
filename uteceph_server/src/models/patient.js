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
      Patient.hasOne(models.History, {foreignKey:'idPatient', sourceKey:'id'});
      Patient.hasOne(models.ExtraOral, {foreignKey:'idPatient', sourceKey:'id'});
      Patient.hasOne(models.IntraOral, {foreignKey:'idPatient', sourceKey:'id'});
      Patient.hasOne(models.Radiography, {foreignKey:'idPatient', sourceKey:'id'});
      Patient.hasOne(models.DiagnosisAndTreatment, {foreignKey:'idPatient', sourceKey:'id'});
      Patient.hasMany(models.ListOfIssue, {foreignKey:'idPatient', sourceKey:'id'});
      Patient.hasMany(models.TreatmentPlan, {foreignKey:'idPatient', sourceKey:'id'});
      Patient.hasMany(models.TreatmentHistory, {foreignKey:'idPatient', sourceKey:'id'});
      Patient.hasMany(models.PatientOfClinic, {foreignKey:'idPatient', sourceKey:'id'});
      Patient.hasMany(models.PatientOfDoctor, {foreignKey:'idPatient', sourceKey:'id'});
      Patient.hasMany(models.SharePatient, {foreignKey:'idPatient', sourceKey:'id'});
      
    }
  }
  Patient.init({
    fullName: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthday: DataTypes.DATE,
    consulationDate: DataTypes.DATE,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    chiefcomplaint: DataTypes.STRING,
    updateByDoctor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};