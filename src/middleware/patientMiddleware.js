import logger from "../config/winston";

const db = require("../models");

const patientMiddleware = {
  checkPatientExists: async (req, res, next) => {
    try {
      const idPatient = req.params.id;
      const patient = await db.Patient.findOne({
        where: {
          id: idPatient,
        },
      });
      if (patient) {
        const diagnose = await db.DiagnosisAndTreatment.findOne({
          attributes: ["diagnose"],
          where: {
            idDiagnosisAndTreatment: idPatient,
          },
        });
        const selectedPlan = await db.TreatmentPlan.findOne({
          attributes: ["plan"],
          where: {
            idTreatmentPlan: idPatient,
            selected: true,
          },
        });
        const updateBydoctor = req.query.updateBydoctor
          ? await db.Doctor.findOne({
              attributes: [["fullName", "fullNameDoctor"], "email"],
              where: {
                id: req.query.updateBydoctor,
              },
            })
          : null;
        const sideFaceImage = await db.LibraryImagePatient.findOne({
          attributes: ["linkImage"],
          where: {
            typeImage: 5,
            idPatientImage: idPatient,
          },
        });
        req.updateBydoctor = updateBydoctor;
        req.diagnose = diagnose;
        req.selectedPlan = selectedPlan;
        req.patient = patient;
        req.sideFaceImage = sideFaceImage;
        next();
      } else {
        return res.status(404).json({
          message: "Patient not found",
        });
      }
    } catch (error) {
      logger.patient.error(error);
      res.status(500).json({
        message: "server error",
      });
    }
  },
  checkPatientExistsFromQuery: async (req, res, next) => {
    try {
      const idPatient = req.query.idPatient;
      const patient = await db.Patient.findOne({
        where: {
          id: idPatient,
        },
      });
      if (patient) {
        req.patient = patient;
        next();
      } else {
        return res.status(404).json({
          message: "Patient not found",
        });
      }
    } catch (error) {
      logger.patient.error(error);
      res.status(500).json({
        message: "server error",
      });
    }
  },
  checkPatient: async (req, res, next) => {
    try {
      const idPatient = req.params.id;
      const patient = await db.Patient.findOne({
        where: {
          id: idPatient,
        },
      });
      if (patient) {
        req.patient = patient;
        next();
      } else {
        return res.status(404).json({
          message: "Patient not found",
        });
      }
    } catch (error) {
      logger.patient.error(error);
      res.status(500).json({
        message: "server error",
      });
    }
  },
};

export default patientMiddleware;
