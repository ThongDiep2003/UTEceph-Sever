"use-strict";
import express from "express";
import radiographyControllers from "../controllers/radiographyControllers";
import doctorMiddleware from "../middleware/doctorMiddleware";
import middlewareController from "../middleware/middlewareController";
import patientMiddleware from "../middleware/patientMiddleware";

const router = express.Router();

router.get(
  "/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  doctorMiddleware.checkRoleDoctor,
  radiographyControllers.getRadiography
);
router.put(
  "/updateRadiography/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  doctorMiddleware.checkDoctorExistsByIdFromBody,
  doctorMiddleware.checkRoleDoctor,
  radiographyControllers.updateRadiography
);

export default router;
