"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ServicesOfClinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ServicesOfClinic.belongsTo(models.Clinic, {
        foreignKey: { name: "idClinicService", allowNull: false },
        targetKey: "id",
      });
      ServicesOfClinic.hasMany(models.Schedule, {
        foreignKey: "idService",
        sourceKey: "id",
      });
    }
  }
  ServicesOfClinic.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      idClinicService: DataTypes.UUID,
      nameService: DataTypes.STRING,
      colorService: DataTypes.STRING,
      priceService: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ServicesOfClinic",
    }
  );
  return ServicesOfClinic;
};
