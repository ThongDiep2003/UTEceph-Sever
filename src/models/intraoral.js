"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class IntraOral extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      IntraOral.belongsTo(models.Patient, {
        foreignKey: { name: "idIntraOral", allowNull: false },
        targetKey: "id",
      });
    }
  }
  IntraOral.init(
    {
      idIntraOral: DataTypes.UUID,
      oralHygiene: DataTypes.STRING,
      dentition: DataTypes.STRING,
      caries: DataTypes.STRING,
      missing: DataTypes.STRING,
      wearingTeeth: DataTypes.STRING,
      detalAldevelopment: DataTypes.STRING,
      otherProblems: DataTypes.STRING,
      archForm: DataTypes.STRING,
      rightCanine: DataTypes.STRING,
      rightMolar: DataTypes.STRING,
      leftCanine: DataTypes.STRING,
      leftMolar: DataTypes.STRING,
      overjet: DataTypes.STRING,
      overbite: DataTypes.STRING,
      curveOfSpee: DataTypes.STRING,
      cant: DataTypes.STRING,
      posteriorRight: DataTypes.STRING,
      posteriorLeft: DataTypes.STRING,
      upperMidline: DataTypes.STRING,
      lowerMidline: DataTypes.STRING,
      deviate: DataTypes.STRING,
      crCoDiscrepancy: DataTypes.STRING,
      maximumMouthOpening: DataTypes.STRING,
      guidanceOnProtrusion: DataTypes.STRING,
      guidanceOnRight: DataTypes.STRING,
      guidanceOnLeft: DataTypes.STRING,
      musculature: DataTypes.STRING,
      swallowingPattern: DataTypes.STRING,
      historyOfTMD: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "IntraOral",
    }
  );
  return IntraOral;
};
