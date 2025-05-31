"use strict";
import logger from "../config/winston";

const db = require("../models");
const { Op } = require("sequelize");

const patientServices = {
  createNewPatient: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (data.idDoctor) {
          const newPatient = await db.Patient.create({
            fullName: data.fullName,
            birthday: new Date(data.birthday),
            gender: data.gender,
            note: data.note,
            idPatientOfDoctor: data.idDoctor,
            updateByDoctor: data.updateByDoctor,
            isEncrypted: data.isEncrypted,
          });
          if (newPatient) {
            const patientHistory = await db.History.create({
              idHistory: newPatient.id,
            });
            const patientExtraOral = await db.ExtraOral.create({
              idExtraOral: newPatient.id,
            });
            const patientIntraOral = await db.IntraOral.create({
              idIntraOral: newPatient.id,
            });
            const patientRadiography = await db.Radiography.create({
              idRadiography: newPatient.id,
            });
            const patientDiagnosisAndTreatment =
              await db.DiagnosisAndTreatment.create({
                idDiagnosisAndTreatment: newPatient.id,
              });
            if (
              patientHistory &&
              patientExtraOral &&
              patientIntraOral &&
              patientRadiography &&
              patientDiagnosisAndTreatment
            )
              resolve({
                status: 200,
                message: "Create patient successfully",
                data: newPatient.dataValues,
              });
          }
        } else {
          const newPatient = await db.Patient.create({
            fullName: data.fullName,
            birthday: new Date(data.birthday),
            gender: data.gender,
            note: data.note,
            idPatientOfClinic: data.idClinic,
            updateByDoctor: data.updateByDoctor,
            isEncrypted: data.isEncrypted,
          });
          if (newPatient) {
            const patientHistory = await db.History.create({
              idHistory: newPatient.id,
            });
            const patientExtraOral = await db.ExtraOral.create({
              idExtraOral: newPatient.id,
            });
            const patientIntraOral = await db.IntraOral.create({
              idIntraOral: newPatient.id,
            });
            const patientRadiography = await db.Radiography.create({
              idRadiography: newPatient.id,
            });
            const patientDiagnosisAndTreatment =
              await db.DiagnosisAndTreatment.create({
                idDiagnosisAndTreatment: newPatient.id,
              });
            if (
              patientHistory &&
              patientExtraOral &&
              patientIntraOral &&
              patientRadiography &&
              patientDiagnosisAndTreatment
            )
              resolve({
                status: 200,
                message: "Create patient successfully",
                data: newPatient.dataValues,
              });
          }
        }
        reject({
          status: 202,
          message: "Create patient failed",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deletePatient: (idPatient) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db.History.destroy({
          where: { idHistory: idPatient },
          force: true,
        });
        await db.ExtraOral.destroy({
          where: { idExtraOral: idPatient },
          force: true,
        });
        await db.IntraOral.destroy({
          where: { idIntraOral: idPatient },
          force: true,
        });
        await db.Radiography.destroy({
          where: { idRadiography: idPatient },
          force: true,
        });
        await db.DiagnosisAndTreatment.destroy({
          where: { idDiagnosisAndTreatment: idPatient },
          force: true,
        });

        await db.ListOfIssue.destroy({
          where: { idListOfIssue: idPatient },
          force: true,
        });
        await db.TreatmentPlan.destroy({
          where: { idTreatmentPlan: idPatient },
          force: true,
        });
        await db.TreatmentHistory.destroy({
          where: { idTreatmentHistory: idPatient },
          force: true,
        });
        await db.LibraryImagePatient.destroy({
          where: { idPatientImage: idPatient },
          force: true,
        });
        await db.SharePatient.destroy({
          where: { idSharedPatient: idPatient },
          force: true,
        });
        await db.Discussion.destroy({
          where: { idRoomDiscussionOfPatient: idPatient },
          force: true,
        });
        const deletePatient = await db.Patient.destroy({
          where: {
            id: idPatient,
          },
          force: true,
        });
        if (deletePatient) {
          resolve({
            status: 200,
            message: "Patient deleted successfully",
          });
        } else {
          resolve({
            status: 202,
            message: "Patient deleted failed",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  getSharedPatientOfDoctor: (idDoctor, page, pageSize, nameSearch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const count = await db.Patient.count({
          include: [
            {
              model: db.SharePatient,
              where: {
                idOwnerDoctor: idDoctor,
                idSharedPatientOfClinic: {
                  [Op.is]: null,
                },
              },
            },
          ],
          where: {
            fullName: { [Op.substring]: `${nameSearch}` },
          },
        });
        const start = (page - 1) * pageSize;
        const listPatient = await db.Patient.findAll({
          include: [
            {
              model: db.SharePatient,
              where: {
                idOwnerDoctor: idDoctor,
                idSharedPatientOfClinic: {
                  [Op.is]: null,
                },
              },
            },
            {
              model: db.LibraryImagePatient,
              attributes: ["linkImage"],
              where: {
                typeImage: 6,
              },
              required: false,
            },
          ],
          offset: start,
          limit: Number(pageSize),
          order: [["createdAt", "DESC"]],
          where: {
            fullName: { [Op.substring]: `${nameSearch}` },
          },
          raw: true,
        });
        if (listPatient.length > 0) {
          resolve({
            status: 200,
            message: "get patient successfully",
            data: listPatient,
            count: count,
          });
        } else {
          resolve({
            status: 200,
            message: "get patient failed",
            data: [],
            count: 0,
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  getSharedPatientOfDoctorInClinic: (
    idDoctor,
    idClinic,
    page,
    pageSize,
    nameSearch
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const count = await db.Patient.count({
          include: [
            {
              model: db.SharePatient,
              where: {
                idOwnerDoctor: idDoctor,
                idSharedPatientOfClinic: idClinic,
              },
            },
          ],
          where: {
            fullName: { [Op.substring]: `${nameSearch}` },
          },
        });
        const start = (page - 1) * pageSize;
        const listPatient = await db.Patient.findAll({
          include: [
            {
              model: db.SharePatient,
              where: {
                idOwnerDoctor: idDoctor,
                idSharedPatientOfClinic: idClinic,
              },
            },
            {
              model: db.LibraryImagePatient,
              attributes: ["linkImage"],
              where: {
                typeImage: 6,
              },
              required: false,
            },
          ],
          offset: start,
          limit: Number(pageSize),
          order: [["createdAt", "DESC"]],
          where: {
            fullName: { [Op.substring]: `${nameSearch}` },
          },
          raw: true,
        });
        if (listPatient.length > 0) {
          resolve({
            status: 200,
            message: "get patient successfully",
            data: listPatient,
            count: count,
          });
        } else {
          resolve({
            status: 200,
            message: "get patient failed",
            data: [],
            count: 0,
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  getPatientListForDoctor: (idDoctor, page, pageSize, nameSearch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const count = await db.Patient.count({
          where: {
            fullName: { [Op.substring]: `${nameSearch}` },
            idPatientOfDoctor: idDoctor,
          },
        });
        const start = (page - 1) * pageSize;
        const listPatient = await db.Patient.findAll({
          include: [
            {
              model: db.LibraryImagePatient,
              attributes: ["linkImage"],
              where: {
                typeImage: 6,
              },
              required: false,
            },
          ],
          offset: start,
          limit: Number(pageSize),
          order: [["createdAt", "DESC"]],
          where: {
            idPatientOfDoctor: idDoctor,
            fullName: { [Op.substring]: `${nameSearch}` },
          },
          raw: true,
        });
        if (listPatient.length > 0) {
          resolve({
            status: 200,
            message: "get patient successfully",
            data: listPatient,
            count: count,
          });
        } else {
          resolve({
            status: 200,
            message: "get patient failed",
            data: [],
            count: 0,
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  getPatientListForClinic: (idClinic, page, pageSize, nameSearch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const count = await db.Patient.count({
          where: {
            fullName: { [Op.substring]: `${nameSearch}` },
            idPatientOfClinic: idClinic,
          },
        });
        const start = (page - 1) * pageSize;
        const listPatient = await db.Patient.findAll({
          include: [
            {
              model: db.LibraryImagePatient,
              attributes: ["linkImage"],
              where: {
                typeImage: 6,
              },
              required: false,
            },
          ],
          offset: start,
          limit: Number(pageSize),
          order: [["createdAt", "DESC"]],
          where: {
            idPatientOfClinic: idClinic,
            fullName: { [Op.substring]: `${nameSearch}` },
          },
          raw: true,
        });
        if (listPatient.length > 0) {
          resolve({
            status: 200,
            message: "get patient successfully",
            data: listPatient,
            count: count,
          });
        } else {
          resolve({
            status: 200,
            message: "get patient failed",
            data: [],
            count: 0,
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  updateInformationPatient: (id, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const dataUpdate = {
          fullName: data.fullName,
          gender: data.gender,
          birthday: new Date(data.birthday),
          consulationDate: new Date(data.consulationDate),
          phoneNumber: data.phoneNumber,
          address: data.address,
          chiefcomplaint: data.chiefcomplaint,
          note: data.note,
          updateByDoctor: data.updateByDoctor,
        };
        if (data.diagnose)
          await db.DiagnosisAndTreatment.update(
            {
              diagnose: data.diagnose,
            },
            {
              where: {
                idDiagnosisAndTreatment: id,
              },
            }
          );
        if (data.selectedPlan) {
          const isSelectedPlan = await db.TreatmentPlan.findOne({
            where: {
              idTreatmentPlan: id,
              selected: true,
            },
          });
          if (isSelectedPlan === null)
            await db.TreatmentPlan.create({
              idTreatmentPlan: id,
              plan: data.selectedPlan,
              selected: true,
            });
          else
            await db.TreatmentPlan.update(
              {
                plan: data.selectedPlan,
              },
              {
                where: {
                  idTreatmentPlan: id,
                  selected: true,
                },
              }
            );
        }
        const checkUpdatePatient = await db.Patient.update(dataUpdate, {
          where: {
            id: id,
          },
        });
        if (checkUpdatePatient) {
          const patient = await db.Patient.findOne({
            where: {
              id: id,
            },
          });
          const getUpdateByDoctor = await db.Doctor.findOne({
            attributes: [["fullName", "fullNameDoctor"], "email"],
            where: {
              id: data.updateByDoctor,
            },
          });
          const diagnose = await db.DiagnosisAndTreatment.findOne({
            attributes: ["diagnose"],
            where: {
              idDiagnosisAndTreatment: id,
            },
          });
          const selectedPlan = await db.TreatmentPlan.findOne({
            attributes: ["plan"],
            where: {
              idTreatmentPlan: id,
              selected: true,
            },
          });
          const sideFaceImage = await db.LibraryImagePatient.findOne({
            attributes: ["linkImage"],
            where: {
              typeImage: 5,
              idPatientImage: id,
            },
          });
          resolve({
            status: 200,
            message: "update information patient successfully",
            data: {
              ...patient,
              ...diagnose,
              ...selectedPlan,
              ...getUpdateByDoctor,
              sideFaceImage,
            },
          });
        } else {
          logger.patient.error(checkUpdatePatient);
          resolve({
            status: 202,
            message: "update information patient failed",
          });
        }
      } catch (error) {
        logger.patient.error(error);
        reject(error);
      }
    });
  },
  saveUpdateDoctor: (idPatient, idDoctor) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newUpdateDoctor = await db.Patient.update(
          {
            updateByDoctor: idDoctor,
          },
          {
            where: {
              id: idPatient,
            },
          }
        );
        if (newUpdateDoctor) resolve();
      } catch (error) {
        reject(error);
      }
    });
  },
  getUpdateDoctor: (idPatient) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateDoctor = await db.Patient.findOne({
          attributes: ["updateByDoctor"],
          where: {
            id: idPatient,
          },
        });
        if (updateDoctor) resolve(updateDoctor);
      } catch (error) {
        reject(error);
      }
    });
  },
};

export default patientServices;
