"use strict";
import logger from "../config/winston";

const db = require("../models");

const treatmentPlanServices = {
  getSelectedTreatmentPlan: (idPatient) => {
    return new Promise(async (resolve, reject) => {
      try {
        const selectedTreatmentPlan = await db.TreatmentPlan.findOne({
          where: {
            idTreatmentPlan: idPatient,
            selected: true,
          },
        });
        if (selectedTreatmentPlan) {
          resolve({
            status: 200,
            message: "get selected treatment plan successfully",
            data: selectedTreatmentPlan,
          });
        } else {
          resolve({
            status: 200,
            message: "get selected treatment plan failed",
            data: {},
          });
        }
      } catch (error) {
        logger.treatmentPlan.error(error);
        reject(error);
      }
    });
  },
  getAllTreatmentPlan: (idPatient, page, pageSize) => {
    return new Promise(async (resolve, reject) => {
      try {
        const start = (page - 1) * pageSize;
        const count = await db.TreatmentPlan.findAll({
          where: {
            idTreatmentPlan: idPatient,
          },
        });
        if (count.length === 0) {
          resolve({
            status: 200,
            message: "get all treatment plan successfully",
            data: [],
            count: count.length,
          });
          return;
        }
        const allTreatmentPlan = await db.TreatmentPlan.findAll({
          order: [["createdAt", "DESC"]],
          offset: start,
          limit: Number(pageSize),
          where: {
            idTreatmentPlan: idPatient,
          },
        });
        if (allTreatmentPlan.length >= 0) {
          resolve({
            status: 200,
            message: "get all treatment plan successfully",
            data: allTreatmentPlan,
            count: count.length,
          });
        } else {
          resolve({
            status: 202,
            message: "get all treatment plan failed",
            data: {},
            count: count.length,
          });
        }
      } catch (error) {
        logger.treatmentPlan.error(error);
        reject(error);
      }
    });
  },
  createTreatmentPlan: (idPatient, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (data.selected) {
          await db.TreatmentPlan.update(
            {
              selected: false,
            },
            {
              where: {
                idTreatmentPlan: idPatient,
              },
            }
          );
        }
        const treatmentPlan = await db.TreatmentPlan.create({
          idTreatmentPlan: idPatient,
          plan: data.plan,
          selected: data.selected,
        });
        if (treatmentPlan) {
          const count = await db.TreatmentPlan.findAll({
            where: {
              idTreatmentPlan: idPatient,
            },
          });
          const allTreatmentPlan = await db.TreatmentPlan.findAll({
            order: [["createdAt", "DESC"]],
            offset: 0,
            limit: Number(3),
            where: {
              idTreatmentPlan: idPatient,
            },
          });
          resolve({
            status: 200,
            message: "Create treatment plan successfully",
            data: allTreatmentPlan,
            count: count.length,
          });
        } else {
          resolve({
            status: 202,
            message: "create treatment plan failed",
            data: null,
            count: 0,
          });
        }
      } catch (error) {
        logger.treatmentPlan.error(error);
        reject(error);
      }
    });
  },
  updateTreatmentPlan: (idPatient, idPlan, data, page, pageSize) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (data.selected) {
          await db.TreatmentPlan.update(
            {
              selected: false,
            },
            {
              where: {
                idTreatmentPlan: idPatient,
              },
            }
          );
        }
        const dataUpdate = {
          plan: data.plan,
          selected: data.selected,
        };
        const newPlan = await db.TreatmentPlan.update(dataUpdate, {
          where: {
            id: idPlan,
          },
        });
        if (newPlan) {
          const start = (page - 1) * pageSize;
          const count = await db.TreatmentPlan.findAll({
            where: {
              idTreatmentPlan: idPatient,
            },
          });
          const allTreatmentPlan = await db.TreatmentPlan.findAll({
            order: [["createdAt", "DESC"]],
            offset: start,
            limit: Number(pageSize),
            where: {
              idTreatmentPlan: idPatient,
            },
          });
          resolve({
            status: 200,
            message: "Update treatment plan successfully",
            data: allTreatmentPlan,
            count: count.length,
          });
        } else {
          resolve({
            status: 202,
            message: "update plan failed",
            data: null,
            count: 0,
          });
        }
      } catch (error) {
        logger.treatmentPlan.error(error);
        reject(error);
      }
    });
  },
  deletePlane: (idPatient, idPlan) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deletePlan = await db.TreatmentPlan.destroy({
          where: {
            id: idPlan,
          },
          force: true,
        });
        if (deletePlan) {
          const count = await db.TreatmentPlan.findAll({
            where: {
              idTreatmentPlan: idPatient,
            },
          });
          const allTreatmentPlan = await db.TreatmentPlan.findAll({
            order: [["createdAt", "DESC"]],
            offset: 0,
            limit: Number(3),
            where: {
              idTreatmentPlan: idPatient,
            },
          });
          resolve({
            status: 200,
            message: "Delete treatment plan successfully",
            data: allTreatmentPlan,
            count: count.length,
          });
        } else {
          resolve({
            status: 200,
            message: "Delete plan failed",
            data: null,
            count: 0,
          });
        }
      } catch (error) {
        logger.treatmentPlan.error(error);
        reject(error);
      }
    });
  },
};

export default treatmentPlanServices;
