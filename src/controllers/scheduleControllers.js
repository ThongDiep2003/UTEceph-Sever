'use strict';
import logger from "../config/winston";
import scheduleServices from "../services/scheduleServices";

const scheduleControllers = {
  getPropertiesClinic: async (req,res) => {
    try {
      const { status, message, data } = await scheduleServices.getPropertiesClinic(req.params.id);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.schedule.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  getAllAppointments: async (req,res) => {
    try {
      const { status, message, data } = await scheduleServices.getAllAppointments(req.params.id,req.query.idDoctor,req.query.idPatient);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.schedule.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  createAppointment: async (req,res) => {
    try {
      const { status, message, data } = await scheduleServices.createAppointment(req.params.id,req.body);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.schedule.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  updateAppointment: async (req,res) => {
    try {
      const { status, message, data } = await scheduleServices.updateAppointment(req.params.id,req.query.idAppointment,req.body);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.schedule.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  deleteAppointment: async (req,res) => {
    try {
      const { status, message, data } = await scheduleServices.deleteAppointment(req.params.id,req.query.idAppointment);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.schedule.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  }
}

export default scheduleControllers;