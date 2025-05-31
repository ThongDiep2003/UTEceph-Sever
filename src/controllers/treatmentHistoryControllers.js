"use strict";
import { FILE_CHANGE } from "../common/utility";
import logger from "../config/winston";
import activityHistoryServices from "../services/activityHistoryServices";

const { default: patientServices } = require("../services/patientServices");
const {
  default: treatmentHistoryServices,
} = require("../services/treatmentHistoryServices");

const treatmentHistoryControllers = {
  createTreatmentHistory: async (req, res) => {
    try {
      if (req.checkRole === "view") {
        res.status(401).json({
          message: "You do not have permission to edit this patient",
        });
        return;
      }
      const { status, message, data, count } =
        await treatmentHistoryServices.createTreatmentHistory(
          req.params.id,
          req.body
        );

      await activityHistoryServices.addActivityHistory({
        idPatient: req.params.id,
        idDoctor: req.body.idDoctor,
        fileChange: FILE_CHANGE.TREATMENT_HISTORY,
        contentChange: "Thêm lịch sử điều trị cho bệnh nhân",
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
      logger.treatmentHistory.error(error);
      res.status(500).json({
        message: error,
      });
    }
  },
  getTreatmentHistory: async (req, res) => {
    try {
      const { status, message, data, count } =
        await treatmentHistoryServices.getTreatmentHistory(
          req.params.id,
          req.query.page,
          req.query.pageSize
        );
      res.status(status).json({
        message: message,
        data: data,
        count: count,
      });
    } catch (error) {
      logger.treatmentHistory.error(error);
      res.status(500).json({
        message: error,
      });
    }
  },
  updateTreatmentHistory: async (req, res) => {
    try {
      if (req.checkRole === "view") {
        res.status(401).json({
          message: "You do not have permission to edit this patient",
        });
        return;
      }
      const { status, message, data, count } =
        await treatmentHistoryServices.updateTreatmentHistory(
          req.params.id,
          req.query.idHistory,
          req.body,
          req.query.page,
          req.query.pageSize
        );

      await activityHistoryServices.addActivityHistory({
        idPatient: req.params.id,
        idDoctor: req.body.idDoctor,
        fileChange: FILE_CHANGE.TREATMENT_HISTORY,
        contentChange: "Cập nhật lịch sử điều trị cho bệnh nhân",
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
      logger.treatmentHistory.error(error);
      res.status(500).json({
        message: error,
      });
    }
  },
  deleteTreatmentHistory: async (req, res) => {
    try {
      if (req.checkRole === "view") {
        res.status(401).json({
          message: "You do not have permission to edit this patient",
        });
        return;
      }
      const { status, message, data, count } =
        await treatmentHistoryServices.deleteTreatmentHistory(
          req.params.id,
          req.query.idHistory
        );

      await activityHistoryServices.addActivityHistory({
        idPatient: req.params.id,
        idDoctor: req.query.idDoctor,
        fileChange: FILE_CHANGE.TREATMENT_HISTORY,
        contentChange: "Xóa lịch sử điều trị cho bệnh nhân",
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
      logger.treatmentHistory.error(error);
      res.status(500).json({
        message: error,
      });
    }
  },
};

export default treatmentHistoryControllers;
