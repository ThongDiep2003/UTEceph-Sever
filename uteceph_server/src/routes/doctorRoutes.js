import express from 'express';
import doctorController from '../controllers/doctorController';
import doctorMiddleware from '../middleware/doctorMiddleware';
import middlewareController from '../middleware/middlewareController';

const router = express.Router();

router.post('/register', doctorMiddleware.checkDoctorDontExistsByEmail, doctorController.registerDoctorController);
router.get('/getInformationDoctor/:email', middlewareController.verifyToken, doctorMiddleware.checkDoctorExistsByEmail ,doctorController.getInformationDoctor);
router.get('/getAllClinicFromDoctor/:id', middlewareController.verifyToken, doctorMiddleware.checkDoctorExistsById ,doctorController.getAllClinicFromDoctor);
router.put('/updateInformation/:id', middlewareController.verifyToken, doctorMiddleware.checkDoctorExistsById ,doctorController.updateInformationDoctor);

export default router;