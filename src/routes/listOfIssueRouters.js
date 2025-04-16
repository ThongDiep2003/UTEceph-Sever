import express from 'express';
import listOfIssueControllers from '../controllers/listOfIssueController';
import middlewareController from '../middleware/middlewareController';
import patientMiddleware from '../middleware/patientMiddleware';

const router = express.Router();

router.get('/:id', middlewareController.verifyToken, patientMiddleware.checkPatientExists, listOfIssueControllers.getListOfIssue);
router.post('/createIssue/:id', middlewareController.verifyToken, patientMiddleware.checkPatientExists ,listOfIssueControllers.createIssue);
router.put('/updateIssue/:idIssue/:id', middlewareController.verifyToken, patientMiddleware.checkPatientExists ,listOfIssueControllers.updateIssue);
router.delete('/deleteIssue/:idIssue/:id', middlewareController.verifyToken, patientMiddleware.checkPatientExists, listOfIssueControllers.deleteIssue);

export default router;