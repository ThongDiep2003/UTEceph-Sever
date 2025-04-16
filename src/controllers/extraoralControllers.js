import patientServices from "../services/patientServices";

const { default: extraoralServices } = require("../services/extraoralServices")

const extraoralControllers = {
  getExtraoral: async (req,res) => {
    try {
      const { status, message, data } = await extraoralServices.getExtraoral(req.params.id);
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
  updateExtraoral: async (req,res) => {
    try {
      const { status, message } = await extraoralServices.updateExtraoral(req.params.id,req.body);
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

export default extraoralControllers;