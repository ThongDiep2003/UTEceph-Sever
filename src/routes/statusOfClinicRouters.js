"use-strict";
import express from "express";
import statusOfClinicControllers from "../controllers/statusOfClinicControllers";
import clinicMiddleware from "../middleware/clinicMiddleware";
import middlewareController from "../middleware/middlewareController";

const router = express.Router();

// id là idClinic - id của phòng khám
router.get(
  "/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  statusOfClinicControllers.getStatusClinic
);
router.post(
  "/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  statusOfClinicControllers.createStatus
);
router.put(
  "/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  statusOfClinicControllers.updateStatus
);
router.delete(
  "/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  statusOfClinicControllers.deleteStatus
);

export default router;
