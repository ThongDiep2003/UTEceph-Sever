'use strict';
import logger from "../config/winston";
import statusOfClinicServices from "../services/statusOfClinicServices";

const statusOfClinicControllers ={
  getStatusClinic: async (req,res) => {
    try {
      const { status, message, data } = await statusOfClinicServices.getStatusClinic(req.params.id);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.statusOfClinic.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  createStatus: async (req,res) => {
    try {
      const { status, message, data } = await statusOfClinicServices.createStatus(req.params.id,req.body);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.statusOfClinic.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  updateStatus: async (req,res) => {
    try {
      const { status, message, data } = await statusOfClinicServices.updateStatus(req.params.id,req.body.idStatus,req.body);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.statusOfClinic.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  deleteStatus: async (req,res) => {
    try {
      const { status, message, data } = await statusOfClinicServices.deleteStatus(req.params.id,req.query.idStatus);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.statusOfClinic.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
}

export default statusOfClinicControllers;