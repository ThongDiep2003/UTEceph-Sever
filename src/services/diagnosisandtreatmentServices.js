"use strict";
import logger from "../config/winston";

const db = require("../models");

const diagnosisandtreatmentServices = {
  getDiagnosisAndTreatment: (idPatient) => {
    return new Promise(async (resolve, reject) => {
      try {
        const diagnosis = await db.DiagnosisAndTreatment.findOne({
          where: {
            idDiagnosisAndTreatment: idPatient,
          },
        });
        if (diagnosis) {
          resolve({
            status: 200,
            message: "get diagnosisAndTreatment successfully",
            data: diagnosis,
          });
        } else {
          resolve({
            status: 202,
            message: "get diagnosisAndTreatment failed",
            data: null,
          });
        }
      } catch (error) {
        logger.diagnosis.error(error);
        reject(error);
      }
    });
  },
  updateDiagnosisAndTreatment: (idPatient, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const dataUpdate = {
          diagnose: data.diagnose,
          prognosisAndNotes: data.prognosisAndNotes,
        };
        const diagnosisUpdate = await db.DiagnosisAndTreatment.update(
          dataUpdate,
          {
            where: {
              idDiagnosisAndTreatment: idPatient,
            },
          }
        );
        if (diagnosisUpdate) {
          const newDiagnosis = await db.DiagnosisAndTreatment.findOne({
            where: {
              idDiagnosisAndTreatment: idPatient,
            },
          });
          resolve({
            status: 200,
            message: "update diagnosisAndTreatment successfully",
            data: newDiagnosis,
          });
        } else {
          resolve({
            status: 202,
            message: "update diagnosisAndTreatment failed",
            data: null,
          });
        }
      } catch (error) {
        logger.diagnosis.error(error);
        reject(error);
      }
    });
  },
};

export default diagnosisandtreatmentServices;
