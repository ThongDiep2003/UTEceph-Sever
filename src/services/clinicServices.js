"use strict";
import db, { sequelize } from "../models";
import QueryTypes from "sequelize";
import patientServices from "./patientServices";
import logger from "../config/winston";

const clinicServices = {
  getAllClinic: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const listClinic = await db.Clinic.findAll();
        resolve({
          message: "Get all clinic successfully",
          data: listClinic,
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },
  getAllDoctorInClinic: (idClinic, page, pageSize, nameSearch) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!nameSearch) {
          const start = (page - 1) * pageSize;
          const count = await sequelize.query(
            `
            select * from \"MemberOfClinics\", \"Doctors\" 
            where \"MemberOfClinics\".\"idClinic\" = ? 
            and \"MemberOfClinics\".\"idDoctor\" = \"Doctors\".\"id\"`,
            {
              replacements: [idClinic],
              type: QueryTypes.SELECT,
            }
          );
          const listDoctor = await sequelize.query(
            `
            select \"idDoctor\",\"email\",\"fullName\",\"gender\",\"birthday\",\"specialty\",\"avatar\",\"roleOfDoctor\" 
            from \"MemberOfClinics\", \"Doctors\" 
            where \"MemberOfClinics\".\"idClinic\" = ? 
            and \"MemberOfClinics\".\"idDoctor\" = \"Doctors\".\"id\" 
            limit ? offset ?`,
            {
              replacements: [idClinic, Number(pageSize), start],
              type: QueryTypes.SELECT,
            }
          );
          if (listDoctor.length > 0) {
            resolve({
              status: 200,
              message: "Get all doctor successfully",
              data: listDoctor[0],
              count: count[0].length,
            });
          } else {
            resolve({
              status: 202,
              message: "Get all doctor failed",
              data: listDoctor,
              count: null,
            });
          }
        } else {
          const start = (page - 1) * pageSize;
          const count = await sequelize.query(
            `
          select * from \"MemberOfClinics\", \"Doctors\" 
          where \"MemberOfClinics\".\"idClinic\" = ? 
          and \"MemberOfClinics\".\"idDoctor\" = \"Doctors\".\"id\"
          and \"Doctors\".\"fullName\" ilike ?`,
            {
              replacements: [idClinic, "%" + nameSearch + "%"],
              type: QueryTypes.SELECT,
            }
          );
          const listDoctor = await sequelize.query(
            `
            select \"idDoctor\",\"email\",\"fullName\",\"gender\",\"birthday\",\"specialty\",\"avatar\",\"roleOfDoctor\" 
            from \"MemberOfClinics\", \"Doctors\" 
            where \"MemberOfClinics\".\"idClinic\" = ? 
            and \"MemberOfClinics\".\"idDoctor\" = \"Doctors\".\"id\" 
            and \"Doctors\".\"fullName\" ilike ?
            limit ? offset ?`,
            {
              replacements: [
                idClinic,
                "%" + nameSearch + "%",
                Number(pageSize),
                start,
              ],
              type: QueryTypes.SELECT,
            }
          );
          if (listDoctor.length > 0) {
            resolve({
              status: 200,
              message: "Get all doctor successfully",
              data: listDoctor[0],
              count: count[0].length,
            });
          } else {
            resolve({
              status: 202,
              message: "Get all doctor failed",
              data: listDoctor,
              count: null,
            });
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  createNewClinic: (idAdminDoctor, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newClinic = await db.Clinic.create({
          nameClinic: data.nameClinic,
          emailClinic: data.emailClinic,
          phoneNumberClinic: data.phoneNumberClinic,
          avatarClinic: data.avatarClinic,
          addressClinic: data.addressClinic,
          description: data.description,
        });
        const { status } = await clinicServices.addDoctorToClinic(
          newClinic.dataValues.id,
          idAdminDoctor,
          "admin"
        );
        if (status) {
          resolve({
            status: 200,
            message: "Create new clinic successfully",
            idClinic: newClinic.dataValues.id,
          });
        } else {
          resolve({
            status: 202,
            message: "create new clinic failed",
            idClinic: null,
          });
        }
      } catch (error) {
        reject({ error });
      }
    });
  },
  addDoctorToClinic: (idClinic, idDoctor, roleOfDoctor) => {
    return new Promise(async (resolve, reject) => {
      try {
        // console.log({idClinic,idDoctor,roleOfDoctor});
        const checkDoctorInClinic = await db.MemberOfClinic.findOne({
          where: {
            idClinic: idClinic,
            idDoctor: idDoctor,
          },
        });
        if (checkDoctorInClinic)
          resolve({ status: 202, message: "doctor is already in this clinic" });
        else {
          const addMemberToClinic = await db.MemberOfClinic.create({
            idClinic: idClinic,
            idDoctor: idDoctor,
            roleOfDoctor: roleOfDoctor,
          });
          if (addMemberToClinic) {
            resolve({
              status: 200,
              message: "Add member to clinic successfully",
            });
          } else {
            resolve({
              status: 202,
              message: "Add member to clinic failed",
            });
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  getInformationClinic: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const clinic = await db.Clinic.findOne({
          where: {
            id: id,
          },
        });
        if (clinic) {
          resolve({
            status: 200,
            message: "get information of clinic successfully",
            data: clinic,
          });
        } else {
          resolve({
            status: 202,
            message: "get information of clinic failed",
            data: {},
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  updateClinicInformation: (idClinic, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const dataUpdate = {
          nameClinic: data.nameClinic,
          emailClinic: data.emailClinic,
          phoneNumberClinic: data.phoneNumberClinic,
          avatarClinic: data.avatarClinic,
          addressClinic: data.addressClinic,
          description: data.description,
        };
        const clinicUpdate = await db.Clinic.update(dataUpdate, {
          where: { id: idClinic },
        });
        if (clinicUpdate) {
          resolve({
            status: 200,
            message: "Update information of clinic successfully",
          });
        } else {
          resolve({
            status: 202,
            message: "Update information of clinic failed",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  updateRoleOfDoctor: (idClinic, idDoctor, roleOfDoctor) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateRoleOfDoctorRequest = await db.MemberOfClinic.update(
          {
            roleOfDoctor: roleOfDoctor,
          },
          {
            where: {
              idClinic: idClinic,
              idDoctor: idDoctor,
            },
          }
        );
        if (updateRoleOfDoctorRequest) {
          resolve({
            status: 200,
            message: "Update role of doctor successfully",
          });
        } else {
          resolve({
            status: 202,
            message: "Update role of doctor failed",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteDoctorFromClinic: (idClinic, idDoctor) => {
    return new Promise(async (resolve, reject) => {
      try {
        const checkDoctorInClinic = await db.MemberOfClinic.findOne({
          where: {
            idClinic: idClinic,
            idDoctor: idDoctor,
          },
        });
        if (!checkDoctorInClinic)
          resolve({ status: 202, message: "Doctor is not in this clinic" });
        const deleteDoctor = await db.MemberOfClinic.destroy({
          where: {
            idClinic: idClinic,
            idDoctor: idDoctor,
          },
        });
        if (deleteDoctor) {
          resolve({
            status: 200,
            message: "Doctor deleted successfully",
          });
        } else {
          resolve({
            status: 202,
            message: "doctor deleted successfully",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteClinic: (idClinic) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db.Schedule.destroy({
          where: {
            idClinicSchedule: idClinic,
          },
        });
        await db.RoomOfClinic.destroy({
          where: {
            idClinicRoom: idClinic,
          },
        });
        await db.ServicesOfClinic.destroy({
          where: {
            idClinicService: idClinic,
          },
        });
        await db.StatusOfClinic.destroy({
          where: {
            idClinicStatus: idClinic,
          },
        });
        const listPatientOfClinic = await db.Patient.findAll({
          where: {
            idPatientOfClinic: idClinic,
          },
        });
        if (listPatientOfClinic.length > 0) {
          for (let index = 0; index < listPatientOfClinic.length; index++) {
            const element = listPatientOfClinic[index];
            await patientServices.deletePatient(element.id);
          }
        }
        const deleteMemberOfClinic = await db.MemberOfClinic.destroy({
          where: {
            idClinic: idClinic,
          },
        });
        if (deleteMemberOfClinic) {
          const deleteClinic = await db.Clinic.destroy({
            where: {
              id: idClinic,
            },
          });
          if (deleteClinic) {
            resolve({
              status: 200,
              message: "Clinic deleted successfully",
            });
          } else {
            resolve({
              status: 202,
              message: "Clinic deleted failed",
            });
          }
        } else {
          resolve({
            status: 202,
            message: "Clinic deleted failed",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
};

export default clinicServices;
