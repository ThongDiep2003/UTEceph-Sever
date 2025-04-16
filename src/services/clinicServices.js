import db, { sequelize } from "../models";
import QueryTypes from "sequelize";

const clinicServices = {
  getAllClinic : () => {
    return new Promise(async (resolve, reject) => {
      try {
        const listClinic = await db.Clinic.findAll();
        resolve({
          message: "Get all clinic successfully",
          data: listClinic
        })
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },
  getAllDoctorInClinic: (idClinic) => {
    return new Promise(async (resolve, reject) => {
      try {
        const listDoctor = await sequelize.query('select email,avatar,roleOfDoctor from myceph.memberofclinics, myceph.doctors where myceph.memberofclinics.idClinic = ? and myceph.memberofclinics.idDoctor = myceph.doctors.id',
          {
            replacements: [idClinic],
            type: QueryTypes.SELECT
          }
        )
        if(listDoctor.length > 0) {
          resolve({
            status: 200,
            message: "Get all doctor successfully",
            data: listDoctor[0]
          })
        }else{
          resolve({
            status: 202,
            message: "Get all doctor failed",
            data: listDoctor
          })
        }
      } catch (error) {
        reject(error);        
      }
    })
  },
  createNewClinic: (idAdminDoctor,data) =>{
    return new Promise(async (resolve, reject) => {
      try {
        const newClinic = await db.Clinic.create({
          nameClinic: data.nameClinic,
          emailClinic: data.emailClinic,
          phoneNumberClinic: data.phoneNumberClinic,
          avatarClinic: data.avatarClinic,
          addressClinic: data.addressClinic,
          description: data.description
        });
        const { status } = await clinicServices.addDoctorToClinic(newClinic.dataValues.id,idAdminDoctor,"admin");
        if(status){
          resolve({
            status: 200,
            message: 'create new clinic successfully'
          })
        }else{
          resolve({
            status: 202,
            message: 'create new clinic failed'
          })
        }
      } catch (error) {
        reject({error});
      }
    })
  },
  addDoctorToClinic: (idClinic,idDoctor,roleOfDoctor) => {
    return new Promise(async (resolve, reject) => {
      try {
        const checkDoctorExists = await db.Doctor.findOne({
          where:{
            id: idDoctor
          }
        })
        if(!checkDoctorExists) {
          resolve({status: 202, message:'doctor not found'});
        }
        const checkDoctorInClinic = await db.MemberOfClinic.findOne({
          where : {
            idClinic: idClinic,
            idDoctor: idDoctor
          }
        })
        if(checkDoctorInClinic) resolve({status: 202, message:'doctor is already in this clinic'});
        const addMemberToClinic = await db.MemberOfClinic.create({
          idClinic: idClinic,
          idDoctor: idDoctor,
          roleOfDoctor: roleOfDoctor
        })
        if(addMemberToClinic){
          resolve({
            status: 200,
            message: 'Add member to clinic successfully'
          })
        }else{
          resolve({
            status: 202,
            message: 'Add member to clinic failed'
          })
        }
      } catch (error) {
        reject(error)
      }
    })
  },
  getInformationClinic: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const clinic = await db.Clinic.findOne({
          where: {
            id: id
          }
        })        
        if(clinic){
          resolve({
            status: 200,
            message: 'get information of clinic successfully',
            data: clinic
          })
        }else{
          resolve({
            status: 202,
            message: 'get information of clinic failed',
            data: {}
          })
        }
      } catch (error) {
        reject(error);
      }
    })
  },
  updateClinicInformation: (idClinic,data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const dataUpdate = {
          nameClinic: data.nameClinic,
          emailClinic: data.emailClinic,
          phoneNumberClinic: data.phoneNumberClinic,
          avatarClinic: data.avatarClinic,
          addressClinic: data.addressClinic,
          description: data.description,
        }
        const clinicUpdate = await db.Clinic.update(dataUpdate, {where: {id : idClinic}});
        if(clinicUpdate){
          resolve({
            status: 200,
            message: 'Update information of clinic successfully'
          })
        }else{
          resolve({
            status: 202,
            message: 'Update information of clinic failed'
          })
        }
      } catch (error) {
        reject(error);
      }
    })
  }
}

export default clinicServices;