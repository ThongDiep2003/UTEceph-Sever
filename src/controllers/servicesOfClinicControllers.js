'use strict';
import logger from "../config/winston";
import servicesOfClinicServices from "../services/servicesOfClinicServices";

const servicesOfClinicControllers = {
  getServicesClinic: async (req,res) => {
    try {
      const { status, message, data } = await servicesOfClinicServices.getServicesClinic(req.params.id);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.servicesOfClinic.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  createServices: async (req,res) => {
    try {
      const { status, message, data } = await servicesOfClinicServices.createServices(req.params.id,req.body);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.servicesOfClinic.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  updateService: async (req,res) => {
    try {
      const { status, message, data } = await servicesOfClinicServices.updateService(req.params.id,req.body.idService,req.body);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.servicesOfClinic.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  deleteService: async (req,res) => {
    try {
      const { status, message, data } = await servicesOfClinicServices.deleteService(req.params.id,req.query.idService);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.servicesOfClinic.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  }
}

export default servicesOfClinicControllers;