import doctorServices from "../services/doctorServices";

const db = require("../models");

const doctorMiddleware = {
  checkDoctorExistsById: async (req, res, next) => {
    try {
      const idDoctor = req.params.id;
      const doctor = await db.Doctor.findOne({
        where: {
          id: idDoctor,
        },
      });
      if (doctor) {
        req.doctor = doctor;
        next();
      } else {
        return res.status(404).json({
          message: "Email doctor is not found",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  checkDoctorExistsByIdFromBody: async (req, res, next) => {
    try {
      const idDoctor = req.body.idDoctor;
      if (!idDoctor)
        return res.status(404).json({
          message: "id doctor is not found",
        });
      const doctor = await db.Doctor.findOne({
        where: {
          id: idDoctor,
        },
      });
      if (doctor) {
        req.doctor = doctor;
        next();
      } else {
        return res.status(404).json({
          message: "doctor is not found",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  checkDoctorExistsByEmail: async (req, res, next) => {
    try {
      const emailDoctor = req.params.email;
      const doctor = await db.Doctor.findOne({
        where: {
          email: emailDoctor,
        },
      });
      if (doctor) {
        req.doctor = doctor;
        next();
      } else {
        return res.status(404).json({
          message: "Email doctor is not found",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  changeTempPasswordFromGoogleAccount: async (req, res, next) => {
    try {
      const email = req.body.email;
      const { status } =
        await doctorServices.changeTempPasswordFromGoogleAccount(email);
      if (status == 200) next();
      else
        res.status(status).json({
          message: "can not login with your account google",
        });
    } catch (error) {
      logger.doctor.error(error);
      res.status(500).json({ message: "server error" });
    }
  },
  checkDoctorDontExistsByEmail: async (req, res, next) => {
    try {
      const emailDoctor = req.body.email;
      const doctor = await db.Doctor.findOne({
        where: {
          email: emailDoctor,
        },
      });
      if (!doctor) {
        next();
      } else {
        return res.status(404).json({
          message: "Email doctor is already exists",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  checkRoleDoctor: async (req, res, next) => {
    try {
      if (req.query.mode !== "unCheck" || !req.query.mode) {
        const { status, message, data } = await doctorServices.checkRoleDoctor(
          req.params.id,
          req.query.idDoctor
        );
        if (status === 200) {
          req.checkRole = data;
          next();
        } else {
          return res.status(status).json({
            message: message,
            data: data,
          });
        }
      } else next();
    } catch (error) {
      return res.status(500).json({
        message: "server error",
      });
    }
  },
};

export default doctorMiddleware;
