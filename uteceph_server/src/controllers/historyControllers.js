import patientServices from "../services/patientServices";

const { default: historyServices } = require("../services/historyServices")

const historyControllers = {
  getHistory: async (req,res) => {
    try {
      const { status, message, data } = await historyServices.getHistory(req.params.id);
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
  updateHistory: async (req,res) => {
    try {
      const { status, message } = await historyServices.updateHistory(req.params.id,req.body);
      patientServices.saveUpdateDoctor(req.params.id,req.body.idDoctor).finally(()=>{
        res.status(status).json({
          message: message,
          data: data
        })
      });
    } catch (error) {
      res.status(400).json({
        message: error
      })
    }
  }
}

export default historyControllers;