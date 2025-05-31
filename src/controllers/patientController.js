"use strict";
import { FILE_CHANGE } from "../common/utility";
import logger from "../config/winston";
import activityHistoryServices from "../services/activityHistoryServices";
import patientServices from "../services/patientServices";

const patientController = {
  createPatient: async (req, res) => {
    try {
      const { status, message, data } = await patientServices.createNewPatient(
        req.body
      );
      res.status(status).json({
        message: message,
        data: data,
      });
    } catch (error) {
      logger.patient.error(error);
      res.status(500).json({
        message: "server error",
      });
    }
  },
  getPatient: async (req, res) => {
    try {
      const updateBydoctor = req.updateBydoctor;
      const patient = req.patient;
      const diagnose = req.diagnose;
      const selectedPlan = req.selectedPlan;
      const sideFaceImage = req.sideFaceImage;
      res.status(200).json({
        message: "get patient information successfully",
        data: {
          ...patient,
          ...diagnose,
          ...selectedPlan,
          ...updateBydoctor,
          sideFaceImage,
        },
        roleOfDoctor: req.checkRole,
      });
    } catch (error) {
      logger.patient.error(error);
      res.status(500).json({
        message: "server error",
      });
    }
  },
  getSharedPatientOfDoctor: async (req, res) => {
    try {
      const { status, message, data, count } =
        await patientServices.getSharedPatientOfDoctor(
          req.params.id,
          req.query.page,
          req.query.pageSize,
          req.query.nameSearch
        );
      res.status(status).json({
        message: message,
        data: data,
        count: count,
      });
    } catch (error) {
      logger.patient.error(error);
      res.status(500).json({
        message: "server error",
      });
    }
  },
  getSharedPatientOfDoctorInClinic: async (req, res) => {
    try {
      const { status, message, data, count } =
        await patientServices.getSharedPatientOfDoctorInClinic(
          req.params.id,
          req.query.idClinic,
          req.query.page,
          req.query.pageSize,
          req.query.nameSearch
        );
      res.status(status).json({
        message: message,
        data: data,
        count: count,
      });
    } catch (error) {
      logger.patient.error(error);
      res.status(500).json({
        message: "server error",
      });
    }
  },
  getPatientListForDoctor: async (req, res) => {
    try {
      const { status, message, data, count } =
        await patientServices.getPatientListForDoctor(
          req.params.id,
          req.query.page,
          req.query.pageSize,
          req.query.nameSearch
        );
      res.status(status).json({
        message: message,
        data: data,
        count: count,
      });
    } catch (error) {
      logger.patient.error(error);
      res.status(500).json({
        message: "server error",
      });
    }
  },
  getPatientListForClinic: async (req, res) => {
    try {
      const { status, message, data, count } =
        await patientServices.getPatientListForClinic(
          req.params.id,
          req.query.page,
          req.query.pageSize,
          req.query.nameSearch
        );
      res.status(status).json({
        message: message,
        data: data,
        count: count,
      });
    } catch (error) {
      logger.patient.error(error);
      res.status(500).json({
        message: "server error",
      });
    }
  },
  deletePatient: async (req, res) => {
    try {
      if (req.checkRole === "view") {
        res.status(401).json({
          message: "You do not have permission to edit this patient",
        });
        return;
      }
      const { status, message } = await patientServices.deletePatient(
        req.params.id
      );
      res.status(status).json({
        message: message,
      });
    } catch (error) {
      logger.patient.error(error);
      res.status(500).json({
        message: "server error",
      });
    }
  },
  updateInformationPatient: async (req, res) => {
    try {
      if (req.checkRole === "view") {
        res.status(401).json({
          message: "You do not have permission to edit this patient",
        });
        return;
      }
      const { status, message, data } =
        await patientServices.updateInformationPatient(req.params.id, req.body);

      await activityHistoryServices.addActivityHistory({
        idPatient: req.params.id,
        idDoctor: req.body.updateByDoctor,
        fileChange: FILE_CHANGE.INFORMATION,
        contentChange: "Cập nhật thông tin cơ bản của bệnh nhân",
      });
      res.status(status).json({
        message: message,
        data: data,
      });
    } catch (error) {
      logger.patient.error(error);
      res.status(500).json({
        message: "server error",
      });
    }
  },
};

export default patientController;
