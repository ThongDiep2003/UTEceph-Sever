"use strict";

import logger from "../config/winston";
import db from "../models";
const { Op } = require("sequelize");

const activityHistoryServices = {
  addActivityHistory: ({ idPatient, idDoctor, fileChange, contentChange }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const dataObject = {
          idPatientHistory: idPatient,
          idDoctorHistory: idDoctor,
          fileChange: fileChange,
          contentChange: contentChange,
        };
        const addActivity = await db.ActivityHistory.create(dataObject);
        if (addActivity) {
          resolve({
            statusAddHistory: 200,
          });
        } else {
          resolve({
            statusAddHistory: 202,
          });
        }
      } catch (error) {
        logger.activityHistory.error(error);
        reject(error);
      }
    });
  },
  getAllActivityHistory: (
    idPatient,
    page,
    pageSize,
    searchDoctor,
    searchDate
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        let whereCondition = {};
        if (searchDoctor && searchDoctor !== "All doctor" && !searchDate) {
          whereCondition = {
            idPatientHistory: idPatient,
            idDoctorHistory: searchDoctor,
          };
        } else if (
          (!searchDoctor || searchDoctor === "All doctor") &&
          searchDate
        ) {
          const startOfDay = new Date(`${searchDate}T00:00:00.000+00:00`);
          const endOfDay = new Date(`${searchDate}T23:59:59.999+00:00`);
          whereCondition = {
            idPatientHistory: idPatient,
            createdAt: {
              [Op.gte]: startOfDay,
              [Op.lt]: endOfDay,
            },
          };
        } else if (
          searchDoctor &&
          searchDoctor !== "All doctor" &&
          searchDate
        ) {
          whereCondition = {
            idPatientHistory: idPatient,
            idDoctorHistory: searchDoctor,
            createdAt: {
              [Op.eq]: new Date(searchDate),
              [Op.lte]: new Date(
                new Date(searchDate).getTime() + 24 * 60 * 60 * 1000
              ),
            },
          };
        } else {
          whereCondition = {
            idPatientHistory: idPatient,
          };
        }
        const start = (page - 1) * pageSize;
        const count = await db.ActivityHistory.findAll({
          include: [
            {
              model: db.Doctor,
              attributes: [
                "id",
                "email",
                "fullName",
                "gender",
                "birthday",
                "avatar",
              ],
            },
          ],
          order: [["createdAt", "DESC"]],
          where: whereCondition,
          raw: true,
        });
        const arrayTemp = [];
        for (let index = 0; index < count.length; index++) {
          const element = count[index];
          arrayTemp.push({
            id: element["Doctor.id"],
            email: element["Doctor.email"],
            fullName: element["Doctor.fullName"],
            gender: element["Doctor.gender"],
            birthday: element["Doctor.birthday"],
            avatar: element["Doctor.avatar"],
          });
        }
        const arrayDoctorAdmin =
          arrayTemp.length > 0
            ? arrayTemp.filter(
                (obj, index, self) =>
                  index === self.findIndex((o) => o.id === obj.id)
              )
            : [];
        if (count.length === 0) {
          resolve({
            status: 200,
            message: "Get activity history successfully",
            data: [],
            count: count.length,
            arrayDoctorAdmin: arrayDoctorAdmin,
          });
          return;
        }
        const allActivityHistory = await db.ActivityHistory.findAll({
          include: [
            {
              model: db.Doctor,
              attributes: [
                "id",
                "email",
                "fullName",
                "gender",
                "birthday",
                "avatar",
              ],
            },
          ],
          order: [["createdAt", "DESC"]],
          offset: start,
          limit: Number(pageSize),
          where: whereCondition,
          raw: true,
        });
        if (allActivityHistory.length >= 0) {
          resolve({
            status: 200,
            message: "Get activity history successfully",
            data: allActivityHistory,
            count: count.length,
            arrayDoctorAdmin: arrayDoctorAdmin,
          });
        } else {
          resolve({
            status: 202,
            message: "Get activity history failed",
            data: {},
            count: count.length,
            arrayDoctorAdmin: arrayDoctorAdmin,
          });
        }
      } catch (error) {
        logger.activityHistory.error(error);
        reject(error);
      }
    });
  },
  deleteActivityHistory: (
    idActivityHistory,
    idPatient,
    page,
    pageSize,
    searchDoctor,
    searchDate
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deleteActivity = await db.ActivityHistory.destroy({
          where: {
            id: idActivityHistory,
          },
          force: true,
        });
        if (deleteActivity) {
          const { status, data, count, arrayDoctorAdmin } =
            await activityHistoryServices.getAllActivityHistory(
              idPatient,
              page,
              pageSize,
              searchDoctor,
              searchDate
            );
          resolve({
            status: status,
            data: data,
            count: count,
            arrayDoctorAdmin: arrayDoctorAdmin,
            message: "Delete activity successfully",
          });
        } else {
          resolve({
            status: 202,
            data: [],
            count: 0,
            message: "Delete activity failed",
          });
        }
      } catch (error) {
        logger.activityHistory.error(error);
        reject(error);
      }
    });
  },
};

export default activityHistoryServices;
