"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoomOfClinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RoomOfClinic.belongsTo(models.Clinic, {
        foreignKey: { name: "idClinicRoom", allowNull: false },
        targetKey: "id",
      });
      RoomOfClinic.hasMany(models.Schedule, {
        foreignKey: "idRoom",
        sourceKey: "id",
      });
    }
  }
  RoomOfClinic.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      idClinicRoom: DataTypes.UUID,
      nameRoom: DataTypes.STRING,
      colorRoom: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "RoomOfClinic",
    }
  );
  return RoomOfClinic;
};
