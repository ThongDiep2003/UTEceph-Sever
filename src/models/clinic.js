'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Clinic.hasMany(models.MemberOfClinic, {foreignKey: 'idClinic', sourceKey: 'id'});
      Clinic.hasMany(models.SharePatient, {foreignKey: 'idSharedPatientOfClinic', sourceKey: 'id'});
      Clinic.hasMany(models.Patient, {foreignKey: 'idPatientOfClinic', sourceKey: 'id'});
    }
  }
  Clinic.init({
    nameClinic: DataTypes.STRING,
    emailClinic: DataTypes.STRING,
    phoneNumberClinic: DataTypes.STRING,
    avatarClinic: DataTypes.STRING,
    addressClinic: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Clinic',
  });
  return Clinic;
};