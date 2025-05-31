"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LibraryImagePatient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LibraryImagePatient.belongsTo(models.Patient, {
        foreignKey: { name: "idPatientImage", allowNull: false },
        targetKey: "id",
      });

      LibraryImagePatient.hasOne(models.LateralCeph, {
        foreignKey: "idImageAnalysis",
        as: "imageAnalysis",
        sourceKey: "id",
      });
    }
  }
  LibraryImagePatient.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      idPatientImage: DataTypes.UUID,
      linkImage: DataTypes.STRING,
      typeImage: DataTypes.INTEGER,
      consultationDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "LibraryImagePatient",
    }
  );
  return LibraryImagePatient;
};
