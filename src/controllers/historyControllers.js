"use strict";
import { FILE_CHANGE } from "../common/utility";
import logger from "../config/winston";
import activityHistoryServices from "../services/activityHistoryServices";
import patientServices from "../services/patientServices";

const { default: historyServices } = require("../services/historyServices");

const historyControllers = {
  getHistory: async (req, res) => {
    try {
      const { status, message, data } = await historyServices.getHistory(
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
      logger.history.error(error);
      res.status(500).json({
        message: error,
      });
    }
  },
  updateHistory: async (req, res) => {
    try {
      if (req.checkRole === "view") {
        res.status(401).json({
          message: "You do not have permission to edit this patient",
        });
        return;
      }
      const { status, message, data } = await historyServices.updateHistory(
        req.params.id,
        req.body
      );
      await activityHistoryServices.addActivityHistory({
        idPatient: req.params.id,
        idDoctor: req.body.idDoctor,
        fileChange: FILE_CHANGE.MEDICAL_RECORD,
        contentChange: "Cập nhật bệnh sử của bệnh nhân",
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
      logger.history.error(error);
      res.status(500).json({
        message: error,
        data: null,
      });
    }
  },
};

export default historyControllers;
