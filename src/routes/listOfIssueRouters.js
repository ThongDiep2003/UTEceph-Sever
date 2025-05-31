"use-strict";
import express from "express";
import listOfIssueControllers from "../controllers/listOfIssueController";
import doctorMiddleware from "../middleware/doctorMiddleware";
import middlewareController from "../middleware/middlewareController";
import patientMiddleware from "../middleware/patientMiddleware";

const router = express.Router();

router.get(
  "/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  doctorMiddleware.checkRoleDoctor,
  listOfIssueControllers.getListOfIssue
);
router.post(
  "/createIssue/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  doctorMiddleware.checkRoleDoctor,
  listOfIssueControllers.createIssue
);
router.put(
  "/updateIssue/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  doctorMiddleware.checkRoleDoctor,
  listOfIssueControllers.updateIssue
);
router.delete(
  "/deleteIssue/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  doctorMiddleware.checkRoleDoctor,
  listOfIssueControllers.deleteIssue
);

export default router;
