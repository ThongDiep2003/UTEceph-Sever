'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.Patient, {foreignKey:{name: 'idHistory', allowNull:false}, targetKey:'id'});
    }
  }
  History.init({
    idHistory: DataTypes.INTEGER,
    dentalHistory: DataTypes.STRING,
    medicalHistory: DataTypes.STRING,
    cvmi: DataTypes.STRING,
    otherMethodToEvaluate: DataTypes.STRING,
    respiration: DataTypes.STRING,
    habits: DataTypes.STRING,
    compliance: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};