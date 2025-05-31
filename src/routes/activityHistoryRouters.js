"use-strict";
import express from "express";
import activityHistoryControllers from "../controllers/activityHistoryControllers";
import doctorMiddleware from "../middleware/doctorMiddleware";
import middlewareController from "../middleware/middlewareController";

const router = express.Router();

router.get(
  "/:id",
  middlewareController.verifyToken,
  doctorMiddleware.checkRoleDoctor,
  activityHistoryControllers.getAllActivityHistory
);

router.delete(
  "/:id",
  middlewareController.verifyToken,
  doctorMiddleware.checkRoleDoctor,
  activityHistoryControllers.deleteActivityHistory
);

export default router;
