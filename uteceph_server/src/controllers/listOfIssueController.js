import patientServices from "../services/patientServices";

const { default: listOfIssueServices } = require("../services/listOfIssueServices")

const listOfIssueControllers = {
  getListOfIssue: async (req,res) => {
    try {
      const { status, message, data } = await listOfIssueServices.getListOfIssue(req.params.id);
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
  createIssue: async (req,res) => {
    try {
      const { status, message } = await listOfIssueServices.createIssue(req.params.id,req.body);
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
  updateIssue: async (req,res) => {
    try {
      const { status, message } = await listOfIssueServices.updateIssue(req.params.idIssue,req.body);
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
  deleteIssue: async (req, res) => {
    try {
      const { status, message } = await listOfIssueServices.deleteIssue(req.params.idIssue);
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

export default listOfIssueControllers;