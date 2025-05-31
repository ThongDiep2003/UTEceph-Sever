"use-strict";
import express from "express";
import diagnosisAndTreatmentControllers from "../controllers/diagnosisAndTreatmentControllers";
import doctorMiddleware from "../middleware/doctorMiddleware";
import middlewareController from "../middleware/middlewareController";
import patientMiddleware from "../middleware/patientMiddleware";

const router = express.Router();

router.get(
  "/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  doctorMiddleware.checkRoleDoctor,
  diagnosisAndTreatmentControllers.getDiagnosisAndTreatment
);
router.put(
  "/updateDiagnosisAndTreatment/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  doctorMiddleware.checkDoctorExistsByIdFromBody,
  doctorMiddleware.checkRoleDoctor,
  diagnosisAndTreatmentControllers.updateDiagnosisAndTreatment
);

export default router;
