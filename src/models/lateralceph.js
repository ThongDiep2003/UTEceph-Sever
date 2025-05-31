"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LateralCeph extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LateralCeph.belongsTo(models.LibraryImagePatient, {
        foreignKey: { name: "idImageAnalysis", allowNull: false },
        targetKey: "id",
      });
    }
  }
  LateralCeph.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      idImageAnalysis: DataTypes.UUID,
      markerPoints: DataTypes.TEXT,
      scaleImage: DataTypes.FLOAT,
      lengthOfRuler: DataTypes.INTEGER,
      noteAnalysis: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "LateralCeph",
    }
  );
  return LateralCeph;
};
