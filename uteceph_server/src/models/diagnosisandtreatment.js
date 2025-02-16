'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiagnosisAndTreatment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DiagnosisAndTreatment.belongsTo(models.Patient, {foreignKey:{name: 'idPatient', allowNull:false}, targetKey:'id'});
    }
  }
  DiagnosisAndTreatment.init({
    diagnose: DataTypes.STRING,
    prognosisAndNotes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DiagnosisAndTreatment',
  });
  return DiagnosisAndTreatment;
};