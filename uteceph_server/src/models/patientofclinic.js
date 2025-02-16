'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PatientOfClinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PatientOfClinic.belongsTo(models.Patient, {foreignKey:{name: 'idPatientOfClinic', allowNull:false}, targetKey:'id'});
    }
  }
  PatientOfClinic.init({
    idClinic: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PatientOfClinic',
  });
  return PatientOfClinic;
};