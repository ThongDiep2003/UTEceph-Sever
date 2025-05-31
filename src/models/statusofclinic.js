"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StatusOfClinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StatusOfClinic.belongsTo(models.Clinic, {
        foreignKey: { name: "idClinicStatus", allowNull: false },
        targetKey: "id",
      });
      StatusOfClinic.hasMany(models.Schedule, {
        foreignKey: "idStatus",
        sourceKey: "id",
      });
    }
  }
  StatusOfClinic.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      idClinicStatus: DataTypes.UUID,
      nameStatus: DataTypes.STRING,
      colorStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "StatusOfClinic",
    }
  );
  return StatusOfClinic;
};
