"use-strict";
import express from "express";
import servicesOfClinicControllers from "../controllers/servicesOfClinicControllers";
import clinicMiddleware from "../middleware/clinicMiddleware";
import middlewareController from "../middleware/middlewareController";

const router = express.Router();

// id là idClinic - id của phòng khám
router.get(
  "/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  servicesOfClinicControllers.getServicesClinic
);
router.post(
  "/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  servicesOfClinicControllers.createServices
);
router.put(
  "/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  servicesOfClinicControllers.updateService
);
router.delete(
  "/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  servicesOfClinicControllers.deleteService
);

export default router;
