'use strict';
import logger from "../config/winston";
import sharePatientServices from "../services/sharePatientServices";

const sharePatientController = {
  sharePatient: async (req,res) => {
    try {
      const { status, message } = await sharePatientServices.sharePatient(req.body,req.body.idSharedPatient,req.body.idOwnerDoctor);
      res.status(status).json({
        message: message
      })
    } catch (error) {
      logger.sharePatient.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  removeSharePatient: async (req,res) => {
    try {
      const { status, message } = await sharePatientServices.removeSharePatient(req.body,req.body.idSharedPatient,req.body.idOwnerDoctor);
      res.status(status).json({
        message: message
      })
    } catch (error) {
      logger.sharePatient.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  updateRoleOfOwnerDoctor: async (req,res) => {
    try {
      const { status, message } = await sharePatientServices.updateRoleOfOwnerDoctor(req.body,req.body.idSharedPatient,req.body.idOwnerDoctor,req.body.roleOfOwnerDoctor);
      res.status(status).json({
        message: message
      })
    } catch (error) {
      logger.sharePatient.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  getDoctorSharedPatient: async (req,res) => {
    try {
      const { status, message, data } = await sharePatientServices.getDoctorSharedPatient(req.params.id);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.sharePatient.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  getAllDoctorSharePatient: async (req,res) => {
    try {
      const { status, message, data, count } = await sharePatientServices.getAllDoctorSharePatient(req.params.idSharedPatientOfDoctor,req.query.page,req.query.pageSize);
      res.status(status).json({
        message: message,
        data: data,
        count: count
      })
    } catch (error) {
      logger.sharePatient.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  getListSharePatientOfDoctor: async (req,res) => {
    try {
      const { status, message, data, count } = await sharePatientServices.getListSharePatientOfDoctor(req.params.idSharedPatientOfDoctor,req.query.idOwnerDoctor,req.query.page,req.query.pageSize);
      res.status(status).json({
        message: message,
        data: data,
        count: count
      })
    } catch (error) {
      logger.sharePatient.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  deleteShareDoctor: async (req,res) => {
    try {
      const { status, message } = await sharePatientServices.deleteShareDoctor(req.params.idSharedPatientOfDoctor,req.query.idOwnerDoctor);
      res.status(status).json({
        message: message
      })
    } catch (error) {
      logger.sharePatient.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  }
  ,
  getListSharePatientOfDoctorInClinic: async (req,res) => {
    try {
      const { status, message, data, count } = await sharePatientServices.getListSharePatientOfDoctorInClinic(req.params.idSharedPatientOfClinic,req.query.idOwnerDoctor,req.query.page,req.query.pageSize);
      res.status(status).json({
        message: message,
        data: data,
        count: count
      })
    } catch (error) {
      logger.sharePatient.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  getListSharePatientOfCurrentDoctor: async (req,res) => {
    try {
      const { status, message, data, count } = await sharePatientServices.getListSharePatientOfCurrentDoctor(req.params.idOwnerDoctor,req.query.page,req.query.pageSize,req.query.nameSearch);
      res.status(status).json({
        message: message,
        data: data,
        count: count
      })
    } catch (error) {
      logger.sharePatient.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
}

export default sharePatientController;