"use-strict";
import express from "express";
import authControllers from "../controllers/auth/authControllers";
import passportJsVerify from "../controllers/token/passportJsVerify";
import refreshTokenController from "../controllers/token/refreshTokenController";
import doctorMiddleware from "../middleware/doctorMiddleware";
import middlewareController from "../middleware/middlewareController";
import recaptchaMiddleware from "../middleware/recaptchaMiddleware";

const router = express.Router();

router.post(
  "/login",
  recaptchaMiddleware.verifyRecaptcha,
  passportJsVerify.authenticate,
  authControllers.login
);
router.post(
  "/loginByGoogle",
  passportJsVerify.authenticate,
  doctorMiddleware.changeTempPasswordFromGoogleAccount,
  authControllers.login
);
router.get("/google", passportJsVerify.authenticateByGoogle);
router.get("/google/callback", passportJsVerify.authenticateCallback);
router.post("/refreshToken", refreshTokenController);
router.post(
  "/logout",
  middlewareController.verifyToken,
  authControllers.logout
);

export default router;
