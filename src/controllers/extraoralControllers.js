"use strict";
import { FILE_CHANGE } from "../common/utility";
import logger from "../config/winston";
import activityHistoryServices from "../services/activityHistoryServices";
import patientServices from "../services/patientServices";

const { default: extraoralServices } = require("../services/extraoralServices");

const extraoralControllers = {
  getExtraoral: async (req, res) => {
    try {
      const { status, message, data } = await extraoralServices.getExtraoral(
        req.params.id
      );
      logger.extraoral.info(data);
      res.status(status).json({
        message: message,
        data: data,
        roleOfDoctor: req.checkRole,
      });
    } catch (error) {
      logger.extraoral.error(error);
      res.status(500).json({
        message: error,
      });
    }
  },
  updateExtraoral: async (req, res) => {
    try {
      if (req.checkRole === "view") {
        res.status(401).json({
          message: "You do not have permission to edit this patient",
        });
        return;
      }
      const { status, message, data } = await extraoralServices.updateExtraoral(
        req.params.id,
        req.body
      );
      await activityHistoryServices.addActivityHistory({
        idPatient: req.params.id,
        idDoctor: req.body.idDoctor,
        fileChange: FILE_CHANGE.MEDICAL_RECORD,
        contentChange: "Cập nhật bệnh lý ngoài mặt của bệnh nhân",
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
      logger.extraoral.error(error);
      res.status(500).json({
        message: error,
      });
    }
  },
};

export default extraoralControllers;
