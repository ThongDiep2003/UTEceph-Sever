"use strict";
import logger from "../config/winston";

const db = require("../models");

const historyServices = {
  getHistory: (idPatient) => {
    return new Promise(async (resolve, reject) => {
      try {
        const history = await db.History.findOne({
          where: {
            idHistory: idPatient,
          },
        });
        if (history) {
          resolve({
            status: 200,
            message: "get history of patient successfully",
            data: history,
          });
        } else {
          resolve({
            status: 202,
            message: "get history of patient failed",
            data: {},
          });
        }
      } catch (error) {
        logger.history.error(error);
        reject(error);
      }
    });
  },
  updateHistory: (idPatient, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const dataUpdate = {
          dentalHistory: data.dentalHistory,
          medicalHistory: data.medicalHistory,
          cvmi: data.cvmi,
          otherMethodToEvaluate: data.otherMethodToEvaluate,
          respiration: data.respiration,
          habits: data.habits,
          familyHistory: data.familyHistory,
          compliance: data.compliance,
        };
        const updateNewHistory = await db.History.update(dataUpdate, {
          where: {
            idHistory: idPatient,
          },
        });
        if (updateNewHistory) {
          const newHistory = await db.History.findOne({
            where: {
              idHistory: idPatient,
            },
          });
          resolve({
            status: 200,
            message: "updated history successfully",
            data: newHistory,
          });
        } else {
          resolve({
            status: 202,
            message: "update history failed",
            data: null,
          });
        }
      } catch (error) {
        logger.history.error(error);
        reject(error);
      }
    });
  },
};

export default historyServices;
