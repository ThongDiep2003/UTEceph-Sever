const { default: patientServices } = require("../services/patientServices");
const { default: treatmentHistoryServices } = require("../services/treatmentHistoryServices")

const treatmentHistoryControllers = {
  createTreatmentHistory: async (req,res) => {
    try {
      const { status, message } = await treatmentHistoryServices.createTreatmentHistory(req.params.id,req.body);
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
  getTreatmentHistory: async (req,res) => {
    try {
      const { status, message, data } = await treatmentHistoryServices.getTreatmentHistory(req.params.id);
      patientServices.getUpdateDoctor(req.params.id).finally(value => {
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
  updateTreatmentHistory: async (req,res) => {
    try {
      const { status, message } = await treatmentHistoryServices.updateTreatmentHistory(req.params.idHistory,req.body);
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
  deleteTreatmentHistory: async (req,res) => {
    try {
      const { status, message } = await treatmentHistoryServices.deleteTreatmentHistory(req.params.idHistory);
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

export default treatmentHistoryControllers;