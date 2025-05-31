"use strict";

import logger from "../config/winston";

const db = require("../models");

const encryptionServices = {
  setEncryptionForClinic: (idClinic, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const dataEncrypt = {
          idDoctor: data.idDoctor,
          nameDoctor: data.nameDoctor,
          emailDoctor: data.emailDoctor,
        };
        const encrypted = await db.Clinic.update(
          {
            encryptedBy: JSON.stringify(dataEncrypt),
          },
          {
            where: {
              id: idClinic,
            },
          }
        );
        if (encrypted) {
          let newClinicWithEncrypted = await db.Clinic.findOne({
            where: {
              id: idClinic,
            },
          });
          newClinicWithEncrypted.encryptedBy = JSON.parse(
            newClinicWithEncrypted.encryptedBy
          );
          return resolve({
            status: 200,
            message: "Set encryption key for clinic successfully",
            data: newClinicWithEncrypted,
          });
        }
        reject({
          status: 202,
          message: "Set encryption key for clinic failed",
          data: null,
        });
      } catch (error) {
        logger.encryption.error(error);
        reject(error);
      }
    });
  },
  deleteEncryptionForClinic: (idClinic) => {
    return new Promise(async (resolve, reject) => {
      try {
        const encrypted = await db.Clinic.update(
          {
            encryptedBy: null,
          },
          {
            where: {
              id: idClinic,
            },
          }
        );
        if (encrypted) {
          let newClinicWithEncrypted = await db.Clinic.findOne({
            where: {
              id: idClinic,
            },
          });
          return resolve({
            status: 200,
            message: "Delete encryption key for clinic successfully",
            data: newClinicWithEncrypted,
          });
        }
        reject({
          status: 202,
          message: "Delete encryption key for clinic failed",
          data: null,
        });
      } catch (error) {
        logger.encryption.error(error);
        reject(error);
      }
    });
  },
  setEncryptionForDoctor: (idDoctor) => {
    return new Promise(async (resolve, reject) => {
      try {
        const encrypted = await db.Doctor.update(
          {
            encryptionKey: true,
          },
          {
            where: {
              id: idDoctor,
            },
          }
        );
        if (encrypted) {
          let newDoctorWithEncrypted = await db.Doctor.findOne({
            where: {
              id: idDoctor,
            },
          });
          return resolve({
            status: 200,
            message: "Set encryption key for doctor successfully",
            data: newDoctorWithEncrypted,
          });
        }
        reject({
          status: 202,
          message: "Set encryption key for doctor failed",
          data: null,
        });
      } catch (error) {
        logger.encryption.error(error);
        reject(error);
      }
    });
  },
  deleteEncryptionForDoctor: (idDoctor) => {
    return new Promise(async (resolve, reject) => {
      try {
        const encrypted = await db.Doctor.update(
          {
            encryptionKey: false,
          },
          {
            where: {
              id: idDoctor,
            },
          }
        );
        if (encrypted) {
          let newDoctorWithEncrypted = await db.Doctor.findOne({
            where: {
              id: idDoctor,
            },
          });
          return resolve({
            status: 200,
            message: "Delete encryption key for doctor successfully",
            data: newDoctorWithEncrypted,
          });
        }
        reject({
          status: 202,
          message: "Delete encryption key for doctor failed",
          data: null,
        });
      } catch (error) {
        logger.encryption.error(error);
        reject(error);
      }
    });
  },
  getAllInformationPatient: (idPatient) => {
    return new Promise(async (resolve, reject) => {
      try {
        const infoOfPatient = await db.Patient.findOne({
          include: [
            {
              model: db.History,
              as: "histories",
              timestamps: false,
              where: {
                idHistory: idPatient,
              },
            },
            {
              model: db.ExtraOral,
              as: "extraOrals",
              timestamps: false,
              where: {
                idExtraOral: idPatient,
              },
            },
            {
              model: db.IntraOral,
              as: "intraOrals",
              timestamps: false,
              where: {
                idIntraOral: idPatient,
              },
            },
            {
              model: db.Radiography,
              as: "radiographies",
              timestamps: false,
              where: {
                idRadiography: idPatient,
              },
            },
            {
              model: db.DiagnosisAndTreatment,
              as: "diagnosisAndTreatments",
              timestamps: false,
              where: {
                idDiagnosisAndTreatment: idPatient,
              },
            },
          ],
          where: {
            id: idPatient,
          },
          raw: true,
          nest: true, // phân loại kết quả theo bảng
        });
        const listOfIssue = await db.ListOfIssue.findAll({
          where: {
            idListOfIssue: idPatient,
          },
        });
        const treatmentPlan = await db.TreatmentPlan.findAll({
          where: {
            idTreatmentPlan: idPatient,
          },
        });
        const treatmentHistory = await db.TreatmentHistory.findAll({
          where: {
            idTreatmentHistory: idPatient,
          },
        });
        if (infoOfPatient) {
          return resolve({
            status: 200,
            message: "get all of information about patient successfully",
            data: {
              infoOfPatient: infoOfPatient,
              otherInformation: {
                listOfIssue: listOfIssue,
                treatmentPlan: treatmentPlan,
                treatmentHistory: treatmentHistory,
              },
            },
          });
        }
        reject({
          status: 202,
          message: "get all of information about patient failed",
          data: null,
        });
      } catch (error) {
        logger.encryption.error(error);
        reject(error);
      }
    });
  },
  setAllInformationPatient: (idPatient, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db.Patient.update(data.informationData, {
          where: {
            id: idPatient,
          },
        });
        await db.History.update(data.historyData, {
          where: {
            idHistory: idPatient,
          },
        });
        await db.ExtraOral.update(data.extraOralData, {
          where: {
            idExtraOral: idPatient,
          },
        });
        await db.IntraOral.update(data.intralOralData, {
          where: {
            idIntraOral: idPatient,
          },
        });
        await db.Radiography.update(data.radiographyData, {
          where: {
            idRadiography: idPatient,
          },
        });
        await db.DiagnosisAndTreatment.update(data.diagnosisAndTreatmentData, {
          where: {
            idDiagnosisAndTreatment: idPatient,
          },
        });
        if (data.listOfIssueData?.length > 0)
          for (let index = 0; index < data.listOfIssueData.length; index++) {
            const element = { ...data.listOfIssueData[index] };
            delete element.id;
            await db.ListOfIssue.update(element, {
              where: {
                id: data.listOfIssueData[index].id,
              },
            });
          }
        if (data.treatmentHistoryData?.length > 0)
          for (
            let index = 0;
            index < data.treatmentHistoryData.length;
            index++
          ) {
            const element = { ...data.treatmentHistoryData[index] };
            delete element.id;
            await db.TreatmentHistory.update(element, {
              where: {
                id: data.treatmentHistoryData[index].id,
              },
            });
          }
        if (data.treatmentPlanData?.length > 0)
          for (let index = 0; index < data.treatmentPlanData.length; index++) {
            const element = { ...data.treatmentPlanData[index] };
            delete element.id;
            await db.TreatmentPlan.update(element, {
              where: {
                id: data.treatmentPlanData[index].id,
              },
            });
          }
        const { isEncrypted } = await db.Patient.findOne({
          attributes: ["isEncrypted"],
          where: {
            id: idPatient,
          },
        });
        return resolve({
          status: 200,
          message: `${
            isEncrypted
              ? "Patient data successfully encrypted"
              : "Patient data successfully decrypted"
          }`,
        });
      } catch (error) {
        logger.encryption.error(error);
        reject(error);
      }
    });
  },
};

export default encryptionServices;
