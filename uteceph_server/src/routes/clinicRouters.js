"use-strict";
import express from "express";
import clinicControllers from "../controllers/clinicControllers";
import clinicMiddleware from "../middleware/clinicMiddleware";
import middlewareController from "../middleware/middlewareController";

const router = express.Router();

router.get(
  "/",
  middlewareController.verifyToken,
  clinicControllers.getAllClinic
);
router.post(
  "/createClinic/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicDontExists,
  clinicControllers.createNewClinic
);
router.get(
  "/getAllDoctorFromClinic/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  clinicControllers.getAllDoctorInClinic
);
router.get(
  "/getInformationClinic/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  clinicControllers.getInformationClinic
);
router.put(
  "/updateInformationClinic/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  clinicControllers.updateInformationClinic
);
router.post(
  "/addDoctorToClinic/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  clinicControllers.addDoctorToClinic
);
router.put(
  "/updateRoleOfDoctor/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  clinicControllers.updateRoleOfDoctor
);
router.delete(
  "/deleteDoctorFromClinic/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  clinicControllers.deleteDoctorFromClinic
);
router.delete(
  "/deleteClinic/:id",
  middlewareController.verifyToken,
  clinicMiddleware.checkClinicExists,
  clinicControllers.deleteClinic
);

export default router;
