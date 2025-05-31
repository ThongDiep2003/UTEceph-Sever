import logger from "../config/winston";
import encryptionServices from "../services/encryptionServices";

const encryptionControllers = {
  setEncryptionForClinic: async (req,res) => {
    try {
      const { status, message, data } = await encryptionServices.setEncryptionForClinic(req.params.id, req.body);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.encryption.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  deleteEncryptionForClinic: async (req,res) => {
    try {
      const { status, message, data } = await encryptionServices.deleteEncryptionForClinic(req.params.id);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.encryption.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  setEncryptionForDoctor: async (req,res) => {
    try {
      const { status, message, data } = await encryptionServices.setEncryptionForDoctor(req.params.id);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.encryption.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  deleteEncryptionForDoctor: async (req,res) => {
    try {
      const { status, message, data } = await encryptionServices.deleteEncryptionForDoctor(req.params.id);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.encryption.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  getAllInformationPatient: async (req, res) => {
    try {
      const { status, message, data } = await encryptionServices.getAllInformationPatient(req.params.id);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.encryption.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  },
  setAllInformationPatient: async (req, res) => {
    try {
      const { status, message } = await encryptionServices.setAllInformationPatient(req.params.id,req.body);
      res.status(status).json({
        message: message
      })
    } catch (error) {
      logger.encryption.error(error);
      res.status(500).json({
        message: 'server error'
      })
    }
  }
}

export default encryptionControllers;