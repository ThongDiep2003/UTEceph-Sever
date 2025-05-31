"use-strict";
import express from "express";
import patientController from "../controllers/patientController";
import clinicMiddleware from "../middleware/clinicMiddleware";
import doctorMiddleware from "../middleware/doctorMiddleware";
import middlewareController from "../middleware/middlewareController";
import patientMiddleware from "../middleware/patientMiddleware";

const router = express.Router();

router.get(
  "/getPatient/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatientExists,
  doctorMiddleware.checkRoleDoctor,
  patientController.getPatient
);
router.get(
  "/getPatientListForDoctor/:id",
  middlewareController.verifyToken,
  doctorMiddleware.checkDoctorExistsById,
  patientController.getPatientListForDoctor
);
router.get(
  "/getPatientListForClinic/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  patientController.getPatientListForClinic
);
router.post(
  "/createPatient",
  middlewareController.verifyToken,
  patientController.createPatient
);
router.delete(
  "/deletePatient/:id",
  middlewareController.verifyToken,
  doctorMiddleware.checkRoleDoctor,
  patientController.deletePatient
);
router.put(
  "/updateInformationPatient/:id",
  middlewareController.verifyToken,
  doctorMiddleware.checkRoleDoctor,
  patientController.updateInformationPatient
);
router.get(
  "/getSharedPatientOfDoctor/:id",
  middlewareController.verifyToken,
  doctorMiddleware.checkDoctorExistsById,
  patientController.getSharedPatientOfDoctor
);
router.get(
  "/getSharedPatientOfDoctorInClinic/:id",
  middlewareController.verifyToken,
  doctorMiddleware.checkDoctorExistsById,
  patientController.getSharedPatientOfDoctorInClinic
);

export default router;
