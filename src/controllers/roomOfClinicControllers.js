'use strict';
import logger from "../config/winston";
import roomOfClinicServices from "../services/roomOfClinicServices"

const roomOfClinicControllers = {
  getRoomClinic: async (req,res) => {
    try {
      const { status, message, data } = await roomOfClinicServices.getRoomClinic(req.params.id);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.roomOfClinic.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  createRoom: async (req,res) => {
    try {
      const { status, message, data } = await roomOfClinicServices.createRoom(req.params.id,req.body);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.roomOfClinic.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  updateRoom: async (req,res) => {
    try {
      const { status, message, data } = await roomOfClinicServices.updateRoom(req.params.id,req.body.idRoom,req.body);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.roomOfClinic.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  deleteRoom: async (req,res) => {
    try {
      const { status, message, data } = await roomOfClinicServices.deleteRoom(req.params.id,req.query.idRoom);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.roomOfClinic.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
}

export default roomOfClinicControllers;