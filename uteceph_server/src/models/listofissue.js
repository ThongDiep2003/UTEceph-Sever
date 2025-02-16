'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListOfIssue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ListOfIssue.belongsTo(models.Patient, {foreignKey:{name: 'idPatientListIssue', allowNull:false}, targetKey:'id'});
    }
  }
  ListOfIssue.init({
    idPatient: DataTypes.INTEGER,
    issue: DataTypes.STRING,
    treatmentObject: DataTypes.STRING,
    treatmentMethod: DataTypes.STRING,
    priotized: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ListOfIssue',
  });
  return ListOfIssue;
};