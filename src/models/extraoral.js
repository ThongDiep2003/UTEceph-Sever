"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExtraOral extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ExtraOral.belongsTo(models.Patient, {
        foreignKey: { name: "idExtraOral", allowNull: false },
        targetKey: "id",
      });
    }
  }
  ExtraOral.init(
    {
      idExtraOral: DataTypes.UUID,
      faceAsymetry: DataTypes.STRING,
      chin: DataTypes.STRING,
      lipCompetence: DataTypes.STRING,
      lipPostureApart: DataTypes.STRING,
      normalNaresExposure: DataTypes.STRING,
      alarBaseWidth: DataTypes.STRING,
      lipWidth: DataTypes.STRING,
      verticalDimensions: DataTypes.STRING,
      overallProfile: DataTypes.STRING,
      lowerThirdProfile: DataTypes.STRING,
      nasolabialAngle: DataTypes.STRING,
      softTissuePogonion: DataTypes.STRING,
      mandibularPlaneAngle: DataTypes.STRING,
      obliqueAnalysis: DataTypes.STRING,
      teethDisplay: DataTypes.STRING,
      gingivalDisplayLevel: DataTypes.STRING,
      incisalDisplayMaxillary: DataTypes.STRING,
      incisalDisplayMandibular: DataTypes.STRING,
      smileArc: DataTypes.STRING,
      restPositionIncisalDisplay: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ExtraOral",
    }
  );
  return ExtraOral;
};
