import express from 'express';
import radiographyControllers from '../controllers/radiographyControllers';
import doctorMiddleware from '../middleware/doctorMiddleware';
import middlewareController from '../middleware/middlewareController';
import patientMiddleware from '../middleware/patientMiddleware';

const router = express.Router();

router.get('/:id', middlewareController.verifyToken, patientMiddleware.checkPatientExists, radiographyControllers.getRadiography);
router.put('/updateRadiography/:id', middlewareController.verifyToken, patientMiddleware.checkPatientExists, doctorMiddleware.checkDoctorExistsByIdFromBody ,radiographyControllers.updateRadiography);

export default router;