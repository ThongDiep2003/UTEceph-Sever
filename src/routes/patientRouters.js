import express from 'express';
import patientController from '../controllers/patientController';
import middlewareController from '../middleware/middlewareController';
import patientMiddleware from '../middleware/patientMiddleware';

const router = express.Router();

router.get('/getPatient/:id', middlewareController.verifyToken, patientMiddleware.checkPatientExists, patientController.getPatient)
router.post('/createPatient', middlewareController.verifyToken, patientController.createPatient);
router.delete('/deletePatient/:id', middlewareController.verifyToken, patientMiddleware.checkPatientExists, patientController.deletePatient);
router.put('/updateInformationPatient/:id', middlewareController.verifyToken, patientMiddleware.checkPatientExists, patientController.updateInformationPatient);

export default router;