import express from "express";
import encryptionControllers from "../controllers/encryptionControllers";
import clinicMiddleware from "../middleware/clinicMiddleware";
import doctorMiddleware from "../middleware/doctorMiddleware";
import middlewareController from "../middleware/middlewareController";
import patientMiddleware from "../middleware/patientMiddleware";

const router = express.Router();

router.get(
  "/getAllInformationPatient/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  encryptionControllers.getAllInformationPatient
);
router.post(
  "/setDataToPatient/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  encryptionControllers.setAllInformationPatient
);

router.post(
  "/encryptionForClinic/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  clinicMiddleware.checkAdminOfClinic,
  encryptionControllers.setEncryptionForClinic
);
router.delete(
  "/encryptionForClinic/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  clinicMiddleware.checkAdminOfClinic,
  encryptionControllers.deleteEncryptionForClinic
);
router.post(
  "/encryptionForDoctor/:id",
  middlewareController.verifyToken,
  doctorMiddleware.checkDoctorExistsById,
  encryptionControllers.setEncryptionForDoctor
);
router.delete(
  "/encryptionForDoctor/:id",
  middlewareController.verifyToken,
  doctorMiddleware.checkDoctorExistsById,
  encryptionControllers.deleteEncryptionForDoctor
);

export default router;
