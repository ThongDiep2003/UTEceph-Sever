"use-strict";
import express from "express";
import doctorController from "../controllers/doctorController";
import doctorMiddleware from "../middleware/doctorMiddleware";
import middlewareController from "../middleware/middlewareController";
import recaptchaMiddleware from "../middleware/recaptchaMiddleware";

const router = express.Router();

router.get(
  "/:id",
  middlewareController.verifyToken,
  doctorMiddleware.checkDoctorExistsById,
  doctorController.getInformationDoctorById
);
router.post(
  "/register",
  recaptchaMiddleware.verifyRecaptcha,
  doctorMiddleware.checkDoctorDontExistsByEmail,
  doctorController.sendVerifyEmailDoctor
);
router.get(
  "/getInformationDoctor/:email",
  middlewareController.verifyToken,
  doctorMiddleware.checkDoctorExistsByEmail,
  doctorController.getInformationDoctor
);
router.get(
  "/getAllClinicFromDoctor/:id",
  middlewareController.verifyToken,
  doctorMiddleware.checkDoctorExistsById,
  doctorController.getAllClinicFromDoctor
);
router.put(
  "/updateInformation/:id",
  middlewareController.verifyToken,
  doctorMiddleware.checkDoctorExistsById,
  doctorController.updateInformationDoctor
);
router.get("/verify/:email", doctorController.verifyEmailDoctor);
router.post(
  "/registerDev",
  recaptchaMiddleware.verifyRecaptcha,
  doctorMiddleware.checkDoctorDontExistsByEmail,
  doctorController.createDoctorDev
);
router.get("/resetPassword/:email", doctorController.verifyResetEmailDoctor);
router.post(
  "/resetPassword",
  recaptchaMiddleware.verifyRecaptcha,
  doctorController.sendVerifyEmailResetPasswordDoctor
);
router.post(
  "/findDoctorEmail/:email",
  recaptchaMiddleware.verifyRecaptcha,
  doctorMiddleware.checkDoctorExistsByEmail,
  doctorController.findDoctorEmail
);
router.get(
  "/getAllDoctorFromEmailSearch/:email",
  middlewareController.verifyToken,
  doctorController.getAllDoctorByEmailSearch
);

export default router;
