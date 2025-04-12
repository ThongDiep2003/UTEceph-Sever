import patientServices from "../services/patientServices";

const { default: intraoralServices } = require("../services/intraoralServices")

const intraoralControllers = {
  getIntraoral: async (req,res) => {
    try {
      const { status, message, data } = await intraoralServices.getIntraoral(req.params.id);
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
  updateIntraoral: async (req,res) => {
    try {
      const { status, message } = await intraoralServices.updateIntraoral(req.params.id,req.body);
      patientServices.saveUpdateDoctor(req.params.id,req.body.idDoctor).finally(()=>{
        res.status(status).json({
          message: message,
          data: data
        })
      })
    } catch (error) {
      res.status(400).json({
        message: error
      })
    }
  }
}

export default intraoralControllers;