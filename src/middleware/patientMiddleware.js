const db = require("../models")

const patientMiddleware = {
  checkPatientExists: async (req,res,next) => {
    try {
      const idPatient = req.params.id;
      const patient = await db.Patient.findOne({
        where: {
          id: idPatient
        }
      });
      if(patient){
        req.patient = patient;
        next();
      }else{
        return res.status(404).json({
          message: 'Patient not found'
        }) 
      }
    } catch (error) {
      res.status(500).json({
        message: 'server error'
      });
    }
  }
}

export default patientMiddleware;