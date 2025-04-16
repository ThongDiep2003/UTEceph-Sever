import patientServices from "../services/patientServices";

const { default: radiographyServices } = require("../services/radiographyServices")

const radiographyControllers = {
  getRadiography: async (req,res) => {
    try {
      const { status, message, data } = await radiographyServices.getRadiography(req.params.id);
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
  updateRadiography: async (req,res) => {
    try {
      const { status, message } = await radiographyServices.updateRadiography(req.params.id, req.body);
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

export default radiographyControllers;