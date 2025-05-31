"use-strict";
import express from "express";
import treatmentPlanControllers from "../controllers/treatmentPlanControllers";
import doctorMiddleware from "../middleware/doctorMiddleware";
import middlewareController from "../middleware/middlewareController";
import patientMiddleware from "../middleware/patientMiddleware";

const router = express.Router();

router.get(
  "/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  doctorMiddleware.checkRoleDoctor,
  treatmentPlanControllers.getAllTreatmentPlan
);
router.get(
  "/getSelectedTreatmentPlan/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  treatmentPlanControllers.getSelectedTreatmentPlan
);
router.post(
  "/createPlan/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  doctorMiddleware.checkRoleDoctor,
  treatmentPlanControllers.createTreatmentPlan
);
router.put(
  "/updatePlan/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  doctorMiddleware.checkRoleDoctor,
  treatmentPlanControllers.updateTreatmentPlan
);
router.delete(
  "/deletePlan/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  doctorMiddleware.checkRoleDoctor,
  treatmentPlanControllers.deleteTreatmentPlan
);

export default router;
