"use-strict";
import express from "express";
import treatmentHistoryControllers from "../controllers/treatmentHistoryControllers";
import doctorMiddleware from "../middleware/doctorMiddleware";
import middlewareController from "../middleware/middlewareController";
import patientMiddleware from "../middleware/patientMiddleware";

const router = express.Router();

router.get(
  "/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  treatmentHistoryControllers.getTreatmentHistory
);
router.post(
  "/createHistory/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  doctorMiddleware.checkRoleDoctor,
  treatmentHistoryControllers.createTreatmentHistory
);
router.put(
  "/updateHistory/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  doctorMiddleware.checkRoleDoctor,
  treatmentHistoryControllers.updateTreatmentHistory
);
router.delete(
  "/deleteHistory/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  doctorMiddleware.checkRoleDoctor,
  treatmentHistoryControllers.deleteTreatmentHistory
);

export default router;
