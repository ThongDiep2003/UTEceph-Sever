'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TreatmentPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TreatmentPlan.belongsTo(models.Patient, {foreignKey:{name: 'idPatientTreatmentPlan', allowNull:false}, targetKey:'id'});
    }
  }
  TreatmentPlan.init({
    idPatient: DataTypes.INTEGER,
    plan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TreatmentPlan',
  });
  return TreatmentPlan;
};