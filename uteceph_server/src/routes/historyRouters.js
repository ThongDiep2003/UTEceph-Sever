import express from 'express';
import historyControllers from '../controllers/historyControllers';
import doctorMiddleware from '../middleware/doctorMiddleware';
import middlewareController from '../middleware/middlewareController';
import patientMiddleware from '../middleware/patientMiddleware';

const router = express.Router();

router.get('/:id', middlewareController.verifyToken, patientMiddleware.checkPatientExists, historyControllers.getHistory);
router.put('/updateHistory/:id', middlewareController.verifyToken, patientMiddleware.checkPatientExists, doctorMiddleware.checkDoctorExistsByIdFromBody ,historyControllers.updateHistory);

export default router;