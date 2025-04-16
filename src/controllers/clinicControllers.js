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
      res.status(400).json({
        message: error
      })
    }
  },
  getAllDoctorInClinic: async (req, res) => {
    try {
      const { status, message, data } = await clinicServices.getAllDoctorInClinic(req.params.id);
      res.status(status).json({
        message: message,
        data: data
      })
    } catch (error) {
      res.status(400).json({
        message: error
      })
    }
  },
  createNewClinic: async (req,res) => {
    try {
      const { status ,message } = await clinicServices.createNewClinic(req.params.id, req.body);     
      res.status(status).json({
        message: message
      })
    } catch (error) {
      res.status(400).json({
        message: error
      })
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
        res.status(400).json({
          message: messageDoctor,
          data: doctor
        })
      }
    } catch (error) {
      res.status(400).json({
        message: error
      })
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
      res.status(400).json({
        message: error
      })
    }
  },
  updateInformationClinic: async (req, res) => {
    try {
      const { status, message } = await clinicServices.updateClinicInformation(req.params.id,req.body);
      res.status(status).json({
        message: message
      })
    } catch (error) {
      res.status(400).json({
        message: error
      })
    }
  }
}

export default clinicControllers;