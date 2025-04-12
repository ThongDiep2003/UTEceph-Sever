import patientServices from "../services/patientServices";

const { default: diagnosisandtreatmentServices } = require("../services/diagnosisandtreatmentServices")

const diagnosisAndTreatmentControllers = {
  getDiagnosisAndTreatment: async (req,res) => {
    try {
      const { status, message, data } = await diagnosisandtreatmentServices.getDiagnosisAndTreatment(req.params.id);
      patientServices.getUpdateDoctor(req.params.id).finally(value => {
        res.status(status).json({
          message: message,
          data: data,
          updateByDoctor: value,
        })
      })
    } catch (error) {
      res.status(400).json({
        message: error
      })
    }
  },
  updateDiagnosisAndTreatment: async (req,res) => {
    try {
      const { status, message } = await diagnosisandtreatmentServices.updateDiagnosisAndTreatment(req.params.id,req.body);
      patientServices.saveUpdateDoctor(req.params.id,req.body.idDoctor).finally(()=>{
        res.status(status).json({
          message: message
        })
      })
    } catch (error) {
      res.status(400).json({
        message: error
      });
    }
  } 
}

export default diagnosisAndTreatmentControllers;