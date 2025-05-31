'use strict';
import logger from "../config/winston";
import clinicServices from "../services/clinicServices"
import doctorServices from "../services/doctorServices";

const clinicControllers = {
  getAllClinic: async (req,res) => {
    try {
      const { message, data } = await clinicServices.getAllClinic();
      res.status(200).json({
        message: message,
        data: data
      })
    } catch (error) {
      logger.clinic.error(error);
      res.status(500).json({
        message: 'server error'
      });
    }
  },
  getAllDoctorInClinic: async (req, res) => {
    try {
      const { status, message, data, count } = await clinicServices.getAllDoctorInClinic(req.params.id,req.query.page,req.query.pageSize,req.query.nameSearch);
      const indexOfElement = data.findIndex(element => 
        element.email === req.query.currentEmailDoctor
      );
      if(data && indexOfElement>=0){
        const elementIndex = data[indexOfElement];
        data.splice(indexOfElement,1);
        data.unshift(elementIndex);
      }
      res.status(status).json({
        message: message,
        data: data,
        count: count
      })
    } catch (error) {
      logger.clinic.error(error);
      res.status(500).json({
        message: 'server error'
      });
    }
  },
  createNewClinic: async (req,res) => {
    try {
      const { idClinic, status, message } = await clinicServices.createNewClinic(req.params.id, req.body);     
      res.status(status).json({
        message: message,
        idClinic: idClinic
      })
    } catch (error) {
      logger.clinic.error(error);
      res.status(500).json({
        message: 'server error'
      });
    }
  },
  updateRoleOfDoctor: async(req,res) => {
    try {
      const { status, message } = await clinicServices.updateRoleOfDoctor(req.params.id,req.body.idDoctor,req.body.roleOfDoctor);
      res.status(status).json({
        message: message
      })
    } catch (error) {
      logger.clinic.error(error);
      res.status(500).json({
        message: 'server error'
      });
    }
  },
  deleteDoctorFromClinic: async (req,res) => {
    try {
      const { status, message } = await clinicServices.deleteDoctorFromClinic(req.clinic.id,req.query.idDoctor);
      res.status(status).json({
        message: message
      })
    } catch (error) {
      logger.clinic.error(error);
      res.status(500).json({
        message: 'server error'
      });
    }
  },
  addDoctorToClinic: async (req,res) => {
    try {
      const { statusDoctor, messageDoctor, doctor} = await doctorServices.getDoctorFromEmail(req.body.email);
      if(statusDoctor){
        const { status, message } = await clinicServices.addDoctorToClinic(req.params.id,doctor.id,req.body.roleOfDoctor);
        res.status(status).json({
          message: message
        })
      }else{
        logger.clinic.error(error);
        res.status(500).json({
          message: 'server error'
        });
      }
    } catch (error) {
      logger.clinic.error(error);
      res.status(500).json({
        message: 'server error'
      });
    }
  },
  getInformationClinic: async (req,res) => {
    try {
      const clinic = req.clinic;
      res.status(200).json({
        message: 'get information clinic successfully',
        data: clinic
      })
    } catch (error) {
      logger.clinic.error(error);
      res.status(500).json({
        message: 'server error'
      });
    }
  },
  updateInformationClinic: async (req, res) => {
    try {
      const { status, message } = await clinicServices.updateClinicInformation(req.params.id,req.body);
      res.status(status).json({
        message: message
      })
    } catch (error) {
      logger.clinic.error(error);
      res.status(500).json({
        message: 'server error'
      });
    }
  },
  deleteClinic: async (req,res) => {
    try {
      const { status, message } = await clinicServices.deleteClinic(req.clinic.id);
      res.status(status).json({
        message: message
      })
    } catch (error) {
      logger.clinic.error(error);
      res.status(500).json({
        message: 'server error'
      });
    }
  }
}

export default clinicControllers;