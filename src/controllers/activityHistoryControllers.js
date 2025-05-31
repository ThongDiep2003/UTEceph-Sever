"use strict";

const { default: logger } = require("../config/winston");
const {
  default: activityHistoryServices,
} = require("../services/activityHistoryServices");

const activityHistoryControllers = {
  getAllActivityHistory: async (req, res) => {
    try {
      if (req.checkRole === "view") {
        res.status(401).json({
          message: "You do not have permission to edit this patient",
        });
        return;
      }
      const { status, data, count, message, arrayDoctorAdmin } =
        await activityHistoryServices.getAllActivityHistory(
          req.params.id,
          req.query.page,
          req.query.pageSize,
          req.query.searchDoctor,
          req.query.searchDate
        );
      res.status(status).json({
        message: message,
        data: data,
        count: count,
        arrayDoctorAdmin: arrayDoctorAdmin,
      });
    } catch (error) {
      logger.activityHistory.error(error);
      res.status(500).json({
        message: error,
      });
    }
  },
  deleteActivityHistory: async (req, res) => {
    try {
      if (req.checkRole === "view") {
        res.status(401).json({
          message: "You do not have permission to edit this patient",
        });
        return;
      }
      const { status, data, count, message, arrayDoctorAdmin } =
        await activityHistoryServices.deleteActivityHistory(
          req.query.id,
          req.params.id,
          req.query.page,
          req.query.pageSize,
          req.query.searchDoctor,
          req.query.searchDate
        );
      res.status(status).json({
        message: message,
        data: data,
        count: count,
        arrayDoctorAdmin: arrayDoctorAdmin,
      });
    } catch (error) {
      logger.activityHistory.error(error);
      res.status(500).json({
        message: error,
      });
    }
  },
};

export default activityHistoryControllers;
