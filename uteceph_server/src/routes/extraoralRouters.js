import express from 'express';
import extraoralControllers from '../controllers/extraoralControllers';
import doctorMiddleware from '../middleware/doctorMiddleware';
import middlewareController from '../middleware/middlewareController';
import patientMiddleware from '../middleware/patientMiddleware';

const router = express.Router();

router.get('/:id', middlewareController.verifyToken, patientMiddleware.checkPatientExists, extraoralControllers.getExtraoral);
router.put('/updateExtraoral/:id', middlewareController.verifyToken, patientMiddleware.checkPatientExists, doctorMiddleware.checkDoctorExistsByIdFromBody ,extraoralControllers.updateExtraoral);

export default router