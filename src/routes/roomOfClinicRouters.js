"use-strict";
import express from "express";
import roomOfClinicControllers from "../controllers/roomOfClinicControllers";
import clinicMiddleware from "../middleware/clinicMiddleware";
import middlewareController from "../middleware/middlewareController";

const router = express.Router();

// id là idClinic - id của phòng khám
router.get(
  "/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  roomOfClinicControllers.getRoomClinic
);
router.post(
  "/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  roomOfClinicControllers.createRoom
);
router.put(
  "/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  roomOfClinicControllers.updateRoom
);
router.delete(
  "/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  roomOfClinicControllers.deleteRoom
);

export default router;
