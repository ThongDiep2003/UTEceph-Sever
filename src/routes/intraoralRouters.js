"use-strict";
import express from "express";
import intraoralControllers from "../controllers/intraoralControllers";
import doctorMiddleware from "../middleware/doctorMiddleware";
import middlewareController from "../middleware/middlewareController";
import patientMiddleware from "../middleware/patientMiddleware";

const router = express.Router();

router.get(
  "/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  doctorMiddleware.checkRoleDoctor,
  intraoralControllers.getIntraoral
);
router.put(
  "/updateIntraoral/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  doctorMiddleware.checkDoctorExistsByIdFromBody,
  doctorMiddleware.checkRoleDoctor,
  intraoralControllers.updateIntraoral
);

export default router;
