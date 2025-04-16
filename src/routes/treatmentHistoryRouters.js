import express from 'express';
import treatmentHistoryControllers from '../controllers/treatmentHistoryControllers';
import middlewareController from '../middleware/middlewareController';
import patientMiddleware from '../middleware/patientMiddleware';

const router = express.Router();

router.get('/:id', middlewareController.verifyToken, patientMiddleware.checkPatientExists, treatmentHistoryControllers.getTreatmentHistory);
router.post('/createHistory/:id', middlewareController.verifyToken, patientMiddleware.checkPatientExists ,treatmentHistoryControllers.createTreatmentHistory);
router.put('/updateHistory/:idHistory/:id', middlewareController.verifyToken, patientMiddleware.checkPatientExists ,treatmentHistoryControllers.updateTreatmentHistory);
router.delete('/deleteHistory/:idHistory/:id', middlewareController.verifyToken, patientMiddleware.checkPatientExists, treatmentHistoryControllers.deleteTreatmentHistory);

export default router;