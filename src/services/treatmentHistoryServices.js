"use strict";
import logger from "../config/winston";

const db = require("../models");
import { Op } from "sequelize";

const treatmentHistoryServices = {
  getTreatmentHistory: (idPatient, page, pageSize) => {
    return new Promise(async (resolve, reject) => {
      try {
        const start = (page - 1) * pageSize;
        const count = await db.TreatmentHistory.findAll({
          where: {
            idTreatmentHistory: idPatient,
          },
        });
        if (count.length === 0) {
          resolve({
            status: 200,
            message: "get treatment history successfully",
            data: [],
            count: count.length,
          });
          return;
        }
        const treatmentHistory = await db.TreatmentHistory.findAll({
          order: [["createdAt", "DESC"]],
          offset: start,
          limit: Number(pageSize),
          where: {
            idTreatmentHistory: idPatient,
          },
        });
        if (treatmentHistory.length >= 0) {
          const arrayTreatmentHistory = [];
          for (const element of treatmentHistory) {
            const whereCondition = {
              consultationDate: {
                [Op.eq]: new Date(element.consultationDate),
                [Op.lte]: new Date(
                  new Date(element.consultationDate).getTime() +
                    24 * 60 * 60 * 1000
                ),
              },
              typeImage: {
                [Op.or]: [1, 2, 3, 4, 10, 11, 12, 13, 14, 15],
              },
              idPatientImage: idPatient,
            };
            const arrayImages = await db.LibraryImagePatient.findAll({
              order: [["consultationDate", "DESC"]],
              where: whereCondition,
            });
            if (arrayImages.length > 0) {
              const elementHistory = Object.assign(element, {
                arrayImages: arrayImages,
              });
              arrayTreatmentHistory.push(elementHistory);
            } else {
              const elementHistory = Object.assign(element, {
                arrayImages: [],
              });
              arrayTreatmentHistory.push(elementHistory);
            }
          }
          resolve({
            status: 200,
            message: "get treatment history successfully",
            data: arrayTreatmentHistory,
            count: count.length,
          });
        } else {
          resolve({
            status: 202,
            message: "get treatment history failed",
            data: [],
            count: 0,
          });
        }
      } catch (error) {
        logger.treatmentHistory.error(error);
        reject(error);
      }
    });
  },
  createTreatmentHistory: (idPatient, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const treatmentHistory = await db.TreatmentHistory.create({
          idTreatmentHistory: idPatient,
          currentStatus: data.currentStatus,
          performedProcedures: data.performedProcedures,
          consultationDate: new Date(data.consultationDate),
        });
        if (treatmentHistory) {
          const count = await db.TreatmentHistory.findAll({
            where: {
              idTreatmentHistory: idPatient,
            },
          });
          const treatmentHistoryData = await db.TreatmentHistory.findAll({
            order: [["createdAt", "DESC"]],
            offset: 0,
            limit: Number(2),
            where: {
              idTreatmentHistory: idPatient,
            },
          });
          const arrayTreatmentHistory = [];
          for (const element of treatmentHistoryData) {
            const whereCondition = {
              consultationDate: {
                [Op.eq]: new Date(element.consultationDate),
                [Op.lte]: new Date(
                  new Date(element.consultationDate).getTime() +
                    24 * 60 * 60 * 1000
                ),
              },
              typeImage: {
                [Op.or]: [1, 2, 3, 4, 10, 11, 12, 13, 14, 15],
              },
              idPatientImage: idPatient,
            };
            const arrayImages = await db.LibraryImagePatient.findAll({
              order: [["consultationDate", "DESC"]],
              where: whereCondition,
            });
            if (arrayImages.length > 0) {
              const elementHistory = Object.assign(element, {
                arrayImages: arrayImages,
              });
              arrayTreatmentHistory.push(elementHistory);
            } else {
              const elementHistory = Object.assign(element, {
                arrayImages: [],
              });
              arrayTreatmentHistory.push(elementHistory);
            }
          }
          resolve({
            status: 200,
            message: "Create treatment history successfully",
            data: arrayTreatmentHistory,
            count: count.length,
          });
        } else {
          resolve({
            status: 202,
            message: "Create treatment history failed",
            data: null,
            count: 0,
          });
        }
      } catch (error) {
        logger.treatmentHistory.error(error);
        reject(error);
      }
    });
  },
  updateTreatmentHistory: (idPatient, idHistory, data, page, pageSize) => {
    return new Promise(async (resolve, reject) => {
      try {
        const dataUpdate = {
          currentStatus: data.currentStatus,
          performedProcedures: data.performedProcedures,
          consultationDate: new Date(data.consultationDate),
        };
        const updateTreatmentHistory = await db.TreatmentHistory.update(
          dataUpdate,
          {
            where: {
              id: idHistory,
            },
          }
        );
        if (updateTreatmentHistory) {
          const count = await db.TreatmentHistory.findAll({
            where: {
              idTreatmentHistory: idPatient,
            },
          });
          const start = (page - 1) * pageSize;
          const treatmentHistoryData = await db.TreatmentHistory.findAll({
            order: [["createdAt", "DESC"]],
            offset: start,
            limit: Number(pageSize),
            where: {
              idTreatmentHistory: idPatient,
            },
          });
          const arrayTreatmentHistory = [];
          for (const element of treatmentHistoryData) {
            const whereCondition = {
              consultationDate: {
                [Op.eq]: new Date(element.consultationDate),
                [Op.lte]: new Date(
                  new Date(element.consultationDate).getTime() +
                    24 * 60 * 60 * 1000
                ),
              },
              typeImage: {
                [Op.or]: [1, 2, 3, 4, 10, 11, 12, 13, 14, 15],
              },
              idPatientImage: idPatient,
            };
            const arrayImages = await db.LibraryImagePatient.findAll({
              order: [["consultationDate", "DESC"]],
              where: whereCondition,
            });
            if (arrayImages.length > 0) {
              const elementHistory = Object.assign(element, {
                arrayImages: arrayImages,
              });
              arrayTreatmentHistory.push(elementHistory);
            } else {
              const elementHistory = Object.assign(element, {
                arrayImages: [],
              });
              arrayTreatmentHistory.push(elementHistory);
            }
          }
          resolve({
            status: 200,
            message: "Update treatment history successfully",
            data: arrayTreatmentHistory,
            count: count.length,
          });
        } else {
          resolve({
            status: 202,
            message: "Update treatment history failed",
            data: null,
            count: 0,
          });
        }
      } catch (error) {
        logger.treatmentHistory.error(error);
        reject(error);
      }
    });
  },
  deleteTreatmentHistory: (idPatient, idHistory) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deleteTreatmentHistory = await db.TreatmentHistory.destroy({
          where: {
            id: idHistory,
          },
        });
        if (deleteTreatmentHistory) {
          const count = await db.TreatmentHistory.findAll({
            where: {
              idTreatmentHistory: idPatient,
            },
          });
          const treatmentHistoryData = await db.TreatmentHistory.findAll({
            order: [["createdAt", "DESC"]],
            offset: 0,
            limit: Number(2),
            where: {
              idTreatmentHistory: idPatient,
            },
          });
          const arrayTreatmentHistory = [];
          for (const element of treatmentHistoryData) {
            const whereCondition = {
              consultationDate: {
                [Op.eq]: new Date(element.consultationDate),
                [Op.lte]: new Date(
                  new Date(element.consultationDate).getTime() +
                    24 * 60 * 60 * 1000
                ),
              },
              typeImage: {
                [Op.or]: [1, 2, 3, 4, 10, 11, 12, 13, 14, 15],
              },
              idPatientImage: idPatient,
            };
            const arrayImages = await db.LibraryImagePatient.findAll({
              order: [["consultationDate", "DESC"]],
              where: whereCondition,
            });
            if (arrayImages.length > 0) {
              const elementHistory = Object.assign(element, {
                arrayImages: arrayImages,
              });
              arrayTreatmentHistory.push(elementHistory);
            } else {
              const elementHistory = Object.assign(element, {
                arrayImages: [],
              });
              arrayTreatmentHistory.push(elementHistory);
            }
          }
          resolve({
            status: 200,
            message: "Delete treatment history successfully",
            data: arrayTreatmentHistory,
            count: count.length,
          });
        } else {
          resolve({
            status: 202,
            message: "Delete treatment history failed",
            data: null,
            count: 0,
          });
        }
      } catch (error) {
        logger.treatmentHistory.error(error);
        reject(error);
      }
    });
  },
};

export default treatmentHistoryServices;
