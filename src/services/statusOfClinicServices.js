"use strict";
import logger from "../config/winston";
import db from "../models";

const statusOfClinicServices = {
  getStatusClinic: (idClinic) => {
    return new Promise(async (resolve, reject) => {
      try {
        const listStatus = await db.StatusOfClinic.findAll({
          order: [["createdAt", "ASC"]],
          where: {
            idClinicStatus: idClinic,
          },
        });
        if (listStatus.length >= 0) {
          resolve({
            status: 200,
            message: "get status from clinic successfully",
            data: listStatus,
          });
        } else {
          resolve({
            status: 202,
            message: "get status from clinic failed",
            data: [],
          });
        }
      } catch (error) {
        logger.statusOfClinic.error(error);
        reject(error);
      }
    });
  },
  createStatus: (idClinic, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const createStatusClinic = await db.StatusOfClinic.create({
          idClinicStatus: idClinic,
          nameStatus: data.nameStatus,
          colorStatus: data.colorStatus,
        });
        if (createStatusClinic) {
          const listStatus = await db.StatusOfClinic.findAll({
            order: [["createdAt", "ASC"]],
            where: {
              idClinicStatus: idClinic,
            },
          });
          resolve({
            status: 200,
            message: "create status successfully",
            data: listStatus,
          });
        } else {
          resolve({
            status: 202,
            message: "create status failed",
            data: [],
          });
        }
      } catch (error) {
        logger.statusOfClinic.error(error);
        reject(error);
      }
    });
  },
  updateStatus: (idClinic, idStatus, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateStatusClinic = await db.StatusOfClinic.update(
          {
            nameStatus: data.nameStatus,
            colorStatus: data.colorStatus,
          },
          {
            where: {
              id: idStatus,
            },
          }
        );
        if (updateStatusClinic) {
          const listStatus = await db.StatusOfClinic.findAll({
            order: [["createdAt", "ASC"]],
            where: {
              idClinicStatus: idClinic,
            },
          });
          resolve({
            status: 200,
            message: "update status successfully",
            data: listStatus,
          });
        } else {
          resolve({
            status: 202,
            message: "update status failed",
            data: [],
          });
        }
      } catch (error) {
        logger.statusOfClinic.error(error);
        reject(error);
      }
    });
  },
  deleteStatus: (idClinic, idStatus) => {
    return new Promise(async (resolve, reject) => {
      try {
        const checkAppointmentWithStatus = await db.Schedule.findOne({
          where: {
            idStatus: idStatus,
          },
        });
        if (checkAppointmentWithStatus) {
          return resolve({
            status: 202,
            message:
              "This status cannot be deleted because it is being used to create an appointment",
          });
        }
        const deleteStatusClinic = await db.StatusOfClinic.destroy({
          where: {
            id: idStatus,
          },
          force: true,
        });
        if (deleteStatusClinic) {
          const listStatus = await db.StatusOfClinic.findAll({
            order: [["createdAt", "ASC"]],
            where: {
              idClinicStatus: idClinic,
            },
          });
          resolve({
            status: 200,
            message: "delete status successfully",
            data: listStatus,
          });
        } else {
          resolve({
            status: 202,
            message: "delete status failed",
            data: [],
          });
        }
      } catch (error) {
        logger.statusOfClinic.error(error);
        reject(error);
      }
    });
  },
};

export default statusOfClinicServices;
