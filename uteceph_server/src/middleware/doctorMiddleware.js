const db = require("../models")

const doctorMiddleware = {
  checkDoctorExistsById: async (req,res,next) => {
    try {
      const idDoctor = req.params.id;
      const doctor = await db.Doctor.findOne({
        where : {
          id: idDoctor
        }
      })
      if(doctor){
        req.doctor = doctor;
        next();
      }else{
        return res.status(404).json({
          message: 'Email doctor is not found'
        })
      }
    } catch (error) {
      return res.status(500).json({
        message: 'server error'
      })
    }
  },
  checkDoctorExistsByIdFromBody: async (req,res,next) => {
    try {
      const idDoctor = req.body.idDoctor;
      if(!idDoctor) return res.status(404).json({
        message: 'id doctor is not found'
      })
      const doctor = await db.Doctor.findOne({
        where : {
          id: idDoctor
        }
      })
      if(doctor){
        req.doctor = doctor;
        next();
      }else{
        return res.status(404).json({
          message: 'doctor is not found'
        })
      }
    } catch (error) {
      return res.status(500).json({
        message: 'server error'
      })
    }
  },
  checkDoctorExistsByEmail: async (req,res,next) => {
    try {
      const emailDoctor = req.params.email;
      const doctor = await db.Doctor.findOne({
        where : {
          email: emailDoctor
        }
      })
      if(doctor){
        req.doctor = doctor;
        next();
      }else{
        return res.status(404).json({
          message: 'Email doctor is not found'
        })
      }
    } catch (error) {
      return res.status(500).json({
        message: 'server error'
      })
    }
  },
  checkDoctorDontExistsByEmail: async (req,res,next) => {
    try {
      const emailDoctor = req.body.email;
      const doctor = await db.Doctor.findOne({
        where : {
          email: emailDoctor
        }
      })
      if(!doctor){ 
        next();
      }else{
        return res.status(404).json({
          message: 'Email doctor is already exists'
        })
      }
    } catch (error) {
      return res.status(500).json({
        message: 'server error'
      })
    }
  },
}

export default doctorMiddleware;