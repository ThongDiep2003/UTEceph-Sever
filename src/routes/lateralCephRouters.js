import express from "express";
import lateralCephController from "../controllers/lateralCephController";
import doctorMiddleware from "../middleware/doctorMiddleware";
import middlewareController from "../middleware/middlewareController";
import patientMiddleware from "../middleware/patientMiddleware";

const router = express.Router();

router.get(
  "/getListFontSideImages/:id",
  middlewareController.verifyToken,
  patientMiddleware.checkPatient,
  doctorMiddleware.checkRoleDoctor,
  lateralCephController.getListFontSideImages
);
router.get(
  "/getImageAnalysis/:id",
  middlewareController.verifyToken,
  lateralCephController.getImageAnalysis
);
router.post(
  "/setImageAnalysis/:id",
  middlewareController.verifyToken,
  doctorMiddleware.checkRoleDoctor,
  lateralCephController.setImageAnalysis
);
router.delete(
  "/deleteImageAnalysis/:id",
  middlewareController.verifyToken,
  doctorMiddleware.checkRoleDoctor,
  lateralCephController.deleteImageAnalysis
);

export default router;
