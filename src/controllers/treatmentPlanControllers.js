"use strict";
import { FILE_CHANGE } from "../common/utility";
import logger from "../config/winston";
import activityHistoryServices from "../services/activityHistoryServices";

const { default: patientServices } = require("../services/patientServices");
const {
  default: treatmentPlanServices,
} = require("../services/treatmentPlanServices");

const treatmentPlanControllers = {
  createTreatmentPlan: async (req, res) => {
    try {
      if (req.checkRole === "view") {
        res.status(401).json({
          message: "You do not have permission to edit this patient",
        });
        return;
      }
      const { status, message, data, count } =
        await treatmentPlanServices.createTreatmentPlan(
          req.params.id,
          req.body
        );

      await activityHistoryServices.addActivityHistory({
        idPatient: req.params.id,
        idDoctor: req.body.idDoctor,
        fileChange: FILE_CHANGE.MEDICAL_RECORD,
        contentChange: "Thêm kế hoạch điều trị cho bệnh nhân",
      });
      patientServices
        .saveUpdateDoctor(req.params.id, req.body.idDoctor)
        .finally(() => {
          res.status(status).json({
            message: message,
            data: data,
            count: count,
          });
        });
    } catch (error) {
      logger.treatmentPlan.error(error);
      res.status(500).json({
        message: error,
      });
    }
  },
  getSelectedTreatmentPlan: async (req, res) => {
    try {
      const { status, message, data } =
        await treatmentPlanServices.getSelectedTreatmentPlan(req.params.id);
      res.status(status).json({
        message: message,
        data: data,
      });
    } catch (error) {
      logger.treatmentPlan.error(error);
      res.status(500).json({
        message: error,
      });
    }
  },
  getAllTreatmentPlan: async (req, res) => {
    try {
      const { status, message, data, count } =
        await treatmentPlanServices.getAllTreatmentPlan(
          req.params.id,
          req.query.page,
          req.query.pageSize
        );
      res.status(status).json({
        message: message,
        data: data,
        roleOfDoctor: req.checkRole,
        count: count,
      });
    } catch (error) {
      logger.treatmentPlan.error(error);
      res.status(500).json({
        message: error,
      });
    }
  },
  updateTreatmentPlan: async (req, res) => {
    try {
      if (req.checkRole === "view") {
        res.status(401).json({
          message: "You do not have permission to edit this patient",
        });
        return;
      }
      const { status, message, data, count } =
        await treatmentPlanServices.updateTreatmentPlan(
          req.params.id,
          req.query.idPlan,
          req.body,
          req.query.page,
          req.query.pageSize
        );

      await activityHistoryServices.addActivityHistory({
        idPatient: req.params.id,
        idDoctor: req.body.idDoctor,
        fileChange: FILE_CHANGE.MEDICAL_RECORD,
        contentChange: "Cập nhật kế hoạch điều trị cho bệnh nhân",
      });
      patientServices
        .saveUpdateDoctor(req.params.id, req.body.idDoctor)
        .finally(() => {
          res.status(status).json({
            message: message,
            data: data,
            count: count,
          });
        });
    } catch (error) {
      logger.treatmentPlan.error(error);
      res.status(500).json({
        message: error,
      });
    }
  },
  deleteTreatmentPlan: async (req, res) => {
    try {
      if (req.checkRole === "view") {
        res.status(401).json({
          message: "You do not have permission to edit this patient",
        });
        return;
      }
      const { status, message, data, count } =
        await treatmentPlanServices.deletePlane(
          req.params.id,
          req.query.idPlan
        );

      await activityHistoryServices.addActivityHistory({
        idPatient: req.params.id,
        idDoctor: req.query.idDoctor,
        fileChange: FILE_CHANGE.MEDICAL_RECORD,
        contentChange: "Xóa kế hoạch điều trị cho bệnh nhân",
      });
      patientServices
        .saveUpdateDoctor(req.params.id, req.query.idDoctor)
        .finally(() => {
          res.status(status).json({
            message: message,
            data: data,
            count: count,
          });
        });
    } catch (error) {
      logger.treatmentPlan.error(error);
      res.status(500).json({
        message: error,
      });
    }
  },
};

export default treatmentPlanControllers;
