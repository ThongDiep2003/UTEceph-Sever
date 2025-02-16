'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PatientOfDoctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PatientOfDoctor.belongsTo(models.Patient, {foreignKey:{name: 'idPatientOfDoctor', allowNull:false}, targetKey:'id'});
    }
  }
  PatientOfDoctor.init({
    idDoctor: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PatientOfDoctor',
  });
  return PatientOfDoctor;
};