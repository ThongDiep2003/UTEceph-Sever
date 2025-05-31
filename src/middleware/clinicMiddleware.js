const db = require("../models");

const clinicMiddleware = {
  checkClinicExists: async (req, res, next) => {
    try {
      const idClinic = req.params.id;
      const clinic = await db.Clinic.findOne({
        where: {
          id: idClinic,
        },
      });
      if (clinic) {
        req.clinic = clinic;
        next();
      } else {
        return res.status(404).json({
          message: "clinic is not found",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  checkClinicDontExists: async (req, res, next) => {
    try {
      const nameClinic = req.body.nameClinic;
      const clinic = await db.Clinic.findOne({
        where: {
          nameClinic: nameClinic,
        },
      });
      if (!clinic) {
        next();
      } else {
        return res.status(404).json({
          message: "Name of clinic is already in use",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "server error",
      });
    }
  },
  checkAdminOfClinic: async (req, res, next) => {
    try {
      const idDoctor = req.query.idDoctor;
      const idClinic = req.params.id;
      const doctor = await db.MemberOfClinic.findOne({
        where: {
          idClinic: idClinic,
          idDoctor: idDoctor,
        },
        attributes: ["roleOfDoctor"],
      });
      if (doctor.roleOfDoctor === "admin") next();
      else
        res.status(500).json({
          message: "You are not allowed to edit this",
        });
    } catch (error) {
      return res.status(500).json({
        message: "server error",
      });
    }
  },
};

export default clinicMiddleware;
