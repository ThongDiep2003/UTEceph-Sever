"use strict";
import { FILE_CHANGE } from "../common/utility";
import logger from "../config/winston";
import activityHistoryServices from "../services/activityHistoryServices";
import patientServices from "../services/patientServices";

const {
  default: listOfIssueServices,
} = require("../services/listOfIssueServices");

const listOfIssueControllers = {
  getListOfIssue: async (req, res) => {
    try {
      const { status, message, data, count } =
        await listOfIssueServices.getListOfIssue(
          req.params.id,
          req.query.page,
          req.query.pageSize
        );
      res.status(status).json({
        message: message,
        data: data,
        count: count,
        roleOfDoctor: req.checkRole,
      });
    } catch (error) {
      logger.listOfIssue.error(error);
      res.status(500).json({
        message: error,
      });
    }
  },
  createIssue: async (req, res) => {
    try {
      if (req.checkRole === "view") {
        res.status(401).json({
          message: "You do not have permission to edit this patient",
        });
        return;
      }
      const { status, message, data, count } =
        await listOfIssueServices.createIssue(req.params.id, req.body);

      await activityHistoryServices.addActivityHistory({
        idPatient: req.params.id,
        idDoctor: req.body.idDoctor,
        fileChange: FILE_CHANGE.MEDICAL_RECORD,
        contentChange: "Thêm vấn đề của bệnh nhân",
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
      logger.listOfIssue.error(error);
      res.status(500).json({
        message: error,
      });
    }
  },
  updateIssue: async (req, res) => {
    try {
      if (req.checkRole === "view") {
        res.status(401).json({
          message: "You do not have permission to edit this patient",
        });
        return;
      }
      const { status, message, data, count } =
        await listOfIssueServices.updateIssue(
          req.params.id,
          req.query.idIssue,
          req.body,
          req.query.page,
          req.query.pageSize
        );

      await activityHistoryServices.addActivityHistory({
        idPatient: req.params.id,
        idDoctor: req.body.idDoctor,
        fileChange: FILE_CHANGE.MEDICAL_RECORD,
        contentChange: "Cập nhật các vấn đề gặp phải của bệnh nhân",
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
      logger.listOfIssue.error(error);
      res.status(500).json({
        message: error,
      });
    }
  },
  deleteIssue: async (req, res) => {
    try {
      if (req.checkRole === "view") {
        res.status(401).json({
          message: "You do not have permission to edit this patient",
        });
        return;
      }
      const { status, message, data, count } =
        await listOfIssueServices.deleteIssue(req.params.id, req.query.idIssue);

      await activityHistoryServices.addActivityHistory({
        idPatient: req.params.id,
        idDoctor: req.query.idDoctor,
        fileChange: FILE_CHANGE.MEDICAL_RECORD,
        contentChange: "Xóa các vấn đề gặp phải của bệnh nhân",
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
      logger.listOfIssue.error(error);
      res.status(500).json({
        message: error,
      });
    }
  },
};

export default listOfIssueControllers;
