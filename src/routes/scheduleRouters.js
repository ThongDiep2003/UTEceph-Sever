"use-strict";
import express from "express";
import scheduleControllers from "../controllers/scheduleControllers";
import clinicMiddleware from "../middleware/clinicMiddleware";
import middlewareController from "../middleware/middlewareController";

const router = express.Router();

router.get(
  "/getPropertiesClinic/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  scheduleControllers.getPropertiesClinic
);
router.get(
  "/getAllAppointments/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  scheduleControllers.getAllAppointments
);
router.post(
  "/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  scheduleControllers.createAppointment
);
router.put(
  "/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  scheduleControllers.updateAppointment
);
router.delete(
  "/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  scheduleControllers.deleteAppointment
);

export default router;
