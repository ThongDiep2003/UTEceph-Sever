'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SharePatient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SharePatient.belongsTo(models.Patient, {foreignKey:{name: 'idPatientSharePatient', allowNull:false}, targetKey:'id'});
      SharePatient.belongsTo(models.Doctor, {foreignKey:{name: 'idDoctorSharePatient', allowNull:false}, targetKey:'id'});
      SharePatient.belongsTo(models.Clinic, {foreignKey:{name: 'idClinicSharePatient', allowNull:false}, targetKey:'id'});
    }
  }
  SharePatient.init({
    idPatient: DataTypes.INTEGER,
    idDoctor: DataTypes.INTEGER,
    idClinic: DataTypes.INTEGER,
    idOwerDoctor: DataTypes.INTEGER,
    roleOfWoerDoctor: DataTypes.STRING,
    idOwerClinic: DataTypes.INTEGER,
    roleOfOwerClinic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SharePatient',
  });
  return SharePatient;
};