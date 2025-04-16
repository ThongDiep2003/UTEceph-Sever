const { default: patientServices } = require("../services/patientServices");
const { default: treatmentPlanServices } = require("../services/treatmentPlanServices")

const treatmentPlanControllers = {
  createTreatmentPlan: async (req,res) => {
    try {
      const { status, message } = await treatmentPlanServices.createTreatmentPlan(req.params.id,req.body);
      patientServices.saveUpdateDoctor(req.params.id,req.body.idDoctor).finally(()=>{
        res.status(status).json({
          message: message
        })
      })
    } catch (error) {
      res.status(400).json({
        message: error
      })
    }
  },
  getAllTreatmentPlan: async (req,res) => {
    try {      
      const { status, message, data } = await treatmentPlanServices.getAllTreatmentPlan(req.params.id);
      patientServices.getUpdateDoctor(req.params.id).then(value => {
        res.status(status).json({
          message: message,
          data: data,
          updateByDoctor: value,
        })
      });
    } catch (error) {
      res.status(400).json({
        message: error
      })
    }
  },
  updateTreatmentPlan: async (req,res) => {
    try {
      const { status, message } = await treatmentPlanServices.updateTreatmentPlan(req.params.idPlan, req.body);
      patientServices.saveUpdateDoctor(req.params.id,req.body.idDoctor).finally(()=>{
        res.status(status).json({
          message: message
        })
      })
    } catch (error) {
      res.status(400).json({
        message: error
      })
    }
  },
  deleteTreatmentPlan: async (req,res) => {
    try {
      const { status, message } = await treatmentPlanServices.deletePlane(req.params.idPlan);
      patientServices.saveUpdateDoctor(req.params.id,req.body.idDoctor).finally(()=>{
        res.status(status).json({
          message: message
        })
      })
    } catch (error) {
      res.status(400).json({
        message: error
      })
    }
  }
}

export default treatmentPlanControllers;