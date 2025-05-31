"use-strict";
import express from "express";
import libraryImagePatientController from "../controllers/libraryImagePatientControllers";
import doctorMiddleware from "../middleware/doctorMiddleware";
import middlewareController from "../middleware/middlewareController";
import patientMiddleware from "../middleware/patientMiddleware";

const router = express.Router();

router.get(
  "/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  doctorMiddleware.checkRoleDoctor,
  libraryImagePatientController.getListImage
);
router.post(
  "/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  doctorMiddleware.checkRoleDoctor,
  libraryImagePatientController.uploadImage
);
router.put(
  "/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  doctorMiddleware.checkRoleDoctor,
  libraryImagePatientController.updateImagePatient
);
router.put(
  "/updateArrayImage/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  doctorMiddleware.checkRoleDoctor,
  libraryImagePatientController.updateArrayImagePatient
);
router.delete(
  "/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  doctorMiddleware.checkRoleDoctor,
  libraryImagePatientController.deleteImagePatient
);

export default router;
