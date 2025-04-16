"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MemberOfClinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MemberOfClinic.belongsTo(models.Clinic, {
        foreignKey: { name: "idClinic", allowNull: false },
        targetKey: "id",
        as: "clinicData",
      });
      MemberOfClinic.belongsTo(models.Doctor, {
        foreignKey: { name: "idDoctor", allowNull: false },
        targetKey: "id",
        as: "doctorData",
      });
    }
  }
  MemberOfClinic.init(
    {
      idClinic: DataTypes.UUID,
      idDoctor: DataTypes.UUID,
      roleOfDoctor: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MemberOfClinic",
    }
  );
  return MemberOfClinic;
};
