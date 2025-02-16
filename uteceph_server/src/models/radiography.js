'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Radiography extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Radiography.belongsTo(models.Patient, {foreignKey:{name: 'idPatientRadiography', allowNull:false}, targetKey:'id'});
    }
  }
  Radiography.init({
    sinuses: DataTypes.STRING,
    condyles: DataTypes.STRING,
    apparentPathology: DataTypes.STRING,
    alveolarBoneHeights: DataTypes.STRING,
    crownRootRatio: DataTypes.STRING,
    others: DataTypes.STRING,
    laterakCephalometricRadiography: DataTypes.STRING,
    otherRadiography: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Radiography',
  });
  return Radiography;
};