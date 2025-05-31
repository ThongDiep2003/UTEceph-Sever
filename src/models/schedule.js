"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.belongsTo(models.Doctor, {
        foreignKey: { name: "idDoctorSchedule", allowNull: false },
        targetKey: "id",
      });
      Schedule.belongsTo(models.Clinic, {
        foreignKey: { name: "idClinicSchedule", allowNull: false },
        targetKey: "id",
      });

      Schedule.belongsTo(models.Patient, {
        foreignKey: { name: "idPatientSchedule", allowNull: false },
        targetKey: "id",
      });
      Schedule.belongsTo(models.StatusOfClinic, {
        foreignKey: { name: "idStatus", allowNull: false },
        targetKey: "id",
      });
      Schedule.belongsTo(models.ServicesOfClinic, {
        foreignKey: { name: "idService", allowNull: false },
        targetKey: "id",
      });
      Schedule.belongsTo(models.RoomOfClinic, {
        foreignKey: { name: "idRoom", allowNull: false },
        targetKey: "id",
      });
    }
  }
  Schedule.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      idPatientSchedule: DataTypes.UUID,
      idDoctorSchedule: DataTypes.UUID,
      idClinicSchedule: DataTypes.UUID,
      appointmentDate: DataTypes.DATE,
      idStatus: DataTypes.UUID,
      idService: DataTypes.UUID,
      idRoom: DataTypes.UUID,
      startTime: DataTypes.TIME,
      endTime: DataTypes.TIME,
      note: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Schedule",
    }
  );
  return Schedule;
};
