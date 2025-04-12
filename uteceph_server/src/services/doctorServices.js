import bcrypt from 'bcrypt';
import db from '../models';

const salt = bcrypt.genSaltSync(10);

const doctorServices = {
  createNewDoctor: (data) => {
		return new Promise(async (resolve, reject) => {
			try {
				let hashed = await bcrypt.hash(data.password, salt);
				let newDoctor = await db.Doctor.create({
					email: data.email,
					password: hashed,
				});
				delete newDoctor.dataValues.password;
				resolve({
          status: 200,
					message: 'Create new doctor successfully.',
					data: newDoctor.dataValues,
				});
			} catch (error) {
				reject(error);
			}
		});
	},
  getDoctorFromEmail: (email) => {
    return new Promise(async (resolve, reject) => {
      try {
        const doctor = await db.Doctor.findOne({
          where: {
            email: email
          }
        })        
        if(doctor){
          delete doctor.password
          resolve({
            statusDoctor: true,
            messageDoctor: 'get information of doctor successfully',
            doctor: doctor
          })
        }else{
          resolve({
            statusDoctor: false,
            messageDoctor: 'get information of doctor failed',
            doctor: doctor
          })
        }
      } catch (error) {
        reject(error);
      }
    })
  },
  updateDoctorInformation: (idDoctor,data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const dataUpdate = {
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          birthday: new Date(data.birthday),
          avatar: data.avatar,
          phoneNumber: data.phoneNumber,
          description: data.description
        }
        const doctorUpdate = await db.Doctor.update(dataUpdate, {where: {id : idDoctor}});
        if(doctorUpdate){
          resolve({
            status: 200,
            message: 'Update information of doctor successfully'
          })
        }else{
          resolve({
            status: 202,
            message: 'Update information of doctor failed'
          })
        }
      } catch (error) {
        reject(error);
      }
    })
  },
  getAllClinicFromDoctor: (idDoctor) => {
    return new Promise(async (resolve, reject) => {
      try {
        const listIdClinic = await db.MemberOfClinic.findAll({
          attributes: ['idClinic'],
          where: {
            idDoctor: idDoctor
          }
        })
        let listClinic = [];
        for (let i = 0; i < listIdClinic.length; i++) {
          listClinic.push(await db.Clinic.findOne({
            where: {
              id: listIdClinic[i].idClinic
            }
          }))
        }
        if(listClinic.length >= 0) {
          resolve({
            status: 200,
            message: "Get all clinic successfully",
            data: listClinic
          })
        }else{
          resolve({
            status: 202,
            message: "Get all clinic failed",
            data: listClinic
          })
        }
      } catch (error) {
        reject(error);        
      }
    })
  }
}

export default doctorServices;