"use strict";
import patientServices from "../services/patientServices";

const {
  default: diagnosisandtreatmentServices,
} = require("../services/diagnosisandtreatmentServices");

const diagnosisAndTreatmentControllers = {
  getDiagnosisAndTreatment: async (req, res) => {
    try {
      const { status, message, data } =
        await diagnosisandtreatmentServices.getDiagnosisAndTreatment(
          req.params.id
        );
      patientServices.getUpdateDoctor(req.params.id).finally((value) => {
        res.status(status).json({
          message: message,
          data: data,
          roleOfDoctor: req.checkRole,
          ...value,
        });
      });
    } catch (error) {
      res.status(400).json({
        message: "server error",
      });
    }
  },
  updateDiagnosisAndTreatment: async (req, res) => {
    try {
      if (req.checkRole === "view") {
        res.status(401).json({
          message: "You do not have permission to edit this patient",
        });
        return;
      }
      const { status, message, data } =
        await diagnosisandtreatmentServices.updateDiagnosisAndTreatment(
          req.params.id,
          req.body
        );
      await activityHistoryServices.addActivityHistory({
        idPatient: req.params.id,
        idDoctor: req.body.idDoctor,
        fileChange: FILE_CHANGE.MEDICAL_RECORD,
        contentChange: "Cập nhật chẩn đoán với tiên lượng và lưu ý",
      });
      patientServices
        .saveUpdateDoctor(req.params.id, req.body.idDoctor)
        .finally(() => {
          res.status(status).json({
            message: message,
            data: data,
          });
        });
    } catch (error) {
      res.status(400).json({
        message: "server error",
      });
    }
  },
};

export default diagnosisAndTreatmentControllers;
