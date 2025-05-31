"use strict";
import bcrypt from "bcrypt";
import db, { sequelize } from "../models";
import mailerServices from "./mailerServices";
import jwt from "jsonwebtoken";
import mailConfig from "../config/mail.config";
import { QueryTypes } from "sequelize";
import logger from "../config/winston";
import fs from "fs";
import path from "path";
import { generatePassword } from "../common/utility";

const salt = bcrypt.genSaltSync(10);

const parentDir = path.join(__dirname, "..");

const privateKey = fs.readFileSync(
  path.join(parentDir, "./controllers/token/private.pem")
);

const doctorServices = {
  createNewDoctor: (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db.Doctor.create({
          email: email,
          password: password,
        });
        resolve({
          status: 200,
          message: "Create new doctor successfully.",
        });
      } catch (error) {
        logger.doctor.error(error);
        reject(error);
      }
    });
  },
  resetPassword: (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const update = await db.Doctor.update(
          {
            password: password,
          },
          {
            where: {
              email: email,
            },
          }
        );
        if (update) {
          resolve({
            status: 200,
            message: "reset password successfully",
          });
        } else {
          resolve({
            status: 202,
            message: "reset password failed",
          });
        }
      } catch (error) {
        logger.doctor.error(error);
        reject(error);
      }
    });
  },
  getAllDoctorByEmailSearch: (emailDoctor, currentEmailDoctor) => {
    return new Promise(async (resolve, reject) => {
      try {
        const listDoctor = await sequelize.query(
          `
          select \"id\",\"email\",\"fullName\",\"avatar\" 
          from \"Doctors\" where \"Doctors\".\"email\" ilike ? 
          and \"Doctors\".\"email\" != ? limit 5`,
          {
            replacements: ["%" + emailDoctor + "%", currentEmailDoctor],
            type: QueryTypes.SELECT,
          }
        );
        if (listDoctor.length >= 0) {
          resolve({
            status: 200,
            message: "get list doctor successfully",
            data: listDoctor,
          });
        } else {
          resolve({
            status: 202,
            message: "get list doctor failed",
            data: [],
          });
        }
      } catch (error) {
        logger.doctor.error(error);
        reject(error);
      }
    });
  },
  sendVerifyEmailResetPassword: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let hashEmail = jwt.sign({ email: data.email }, privateKey, {
          expiresIn: 60 * 3,
          algorithm: "RS512",
        });
        let hashPassword = await bcrypt.hash(data.password, salt);
        mailerServices
          .sendMail(
            data.email,
            mailConfig.HTML_CONTENT_RESETPASSWOR,
            `${process.env.BASE_URL_SERVER}/v1/doctor/resetPassword/${data.email}?password=${hashPassword}&token=${hashEmail}`
          )
          .then(() => {
            resolve({
              status: 200,
              message: "send verify mail successfully",
            });
          })
          .catch((err) =>
            reject({
              status: 500,
              message: "send verify mail failed",
            })
          );
      } catch (error) {
        logger.doctor.error(error);
        reject(error);
      }
    });
  },
  sendVerifyEmail: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let hashEmail = jwt.sign({ email: data.email }, privateKey, {
          expiresIn: 60 * 3,
          algorithm: "RS512",
        });
        let hashPassword = await bcrypt.hash(data.password, salt);
        mailerServices
          .sendMail(
            data.email,
            mailConfig.HTML_CONTENT,
            `${process.env.BASE_URL_SERVER}/v1/doctor/verify/${data.email}?password=${hashPassword}&token=${hashEmail}`
          )
          .then(() => {
            resolve({
              status: 200,
              message: "send verify mail successfully",
            });
          })
          .catch((err) =>
            reject({
              status: 500,
              message: "send verify mail failed",
            })
          );
      } catch (error) {
        logger.doctor.error(error);
        reject(error);
      }
    });
  },
  findDoctorOrCreateDoctorFromEmailGoogle: ({ email, fullName }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const tempPassword = generatePassword();
        let hashPassword = await bcrypt.hash(tempPassword, salt);
        const doctor = await db.Doctor.findOne({
          where: {
            email: email,
          },
        });
        if (doctor) {
          await db.Doctor.update(
            {
              password: hashPassword,
            },
            {
              where: {
                email: email,
              },
            }
          );
          resolve({
            tempPassword: tempPassword,
          });
        } else {
          await db.Doctor.create({
            email: email,
            fullName: fullName,
            password: hashPassword,
          });
          resolve({
            tempPassword: tempPassword,
          });
        }
      } catch (error) {
        logger.doctor.error(error);
        reject(error);
      }
    });
  },
  changeTempPasswordFromGoogleAccount: (email) => {
    return new Promise(async (resolve, reject) => {
      try {
        const tempPassword = generatePassword();
        let hashPassword = await bcrypt.hash(tempPassword, salt);
        const newTempPassword = await db.Doctor.update(
          {
            password: hashPassword,
          },
          {
            where: {
              email: email,
            },
          }
        );
        if (newTempPassword) {
          resolve({
            status: 200,
          });
        } else {
          reject({
            status: 400,
          });
        }
      } catch (error) {
        logger.doctor.error(error);
        reject(error);
      }
    });
  },
  getDoctorFromEmail: (email) => {
    return new Promise(async (resolve, reject) => {
      try {
        const doctor = await db.Doctor.findOne({
          where: {
            email: email,
          },
        });
        if (doctor) {
          delete doctor.password;
          resolve({
            statusDoctor: true,
            messageDoctor: "get information of doctor successfully",
            doctor: doctor,
          });
        } else {
          resolve({
            statusDoctor: false,
            messageDoctor: "can't find information of doctor",
            doctor: doctor,
          });
        }
      } catch (error) {
        logger.doctor.error(error);
        reject(error);
      }
    });
  },
  updateDoctorInformation: (idDoctor, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const dataUpdate = {
          fullName: data.fullName,
          gender: data.gender,
          birthday: new Date(data.birthday),
          avatar: data.avatar,
          phoneNumber: data.phoneNumber,
          specialty: data.specialty,
          diploma: data.diploma,
          position: data.position,
          description: data.description,
        };
        const doctorUpdate = await db.Doctor.update(dataUpdate, {
          where: { id: idDoctor },
        });
        if (doctorUpdate) {
          const data = await db.Doctor.findOne({
            where: {
              id: idDoctor,
            },
          });
          resolve({
            status: 200,
            message: "Update information of doctor successfully",
            data: data,
          });
        } else {
          resolve({
            status: 202,
            message: "Update information of doctor failed",
            data: null,
          });
        }
      } catch (error) {
        logger.doctor.error(error);
        reject(error);
      }
    });
  },
  getAllClinicFromDoctor: (idDoctor) => {
    return new Promise(async (resolve, reject) => {
      try {
        const listMember = await db.MemberOfClinic.findAll({
          order: [["createdAt", "DESC"]],
          where: {
            idDoctor: idDoctor,
          },
        });
        let listClinic = [];
        for (let i = 0; i < listMember.length; i++) {
          let clinic = await db.Clinic.findOne({
            where: {
              id: listMember[i].idClinic,
            },
          });
          clinic.encryptedBy = JSON.parse(clinic.encryptedBy);
          listClinic.push(
            Object.assign(clinic, { roleOfDoctor: listMember[i].roleOfDoctor })
          );
        }
        if (listClinic.length >= 0) {
          resolve({
            status: 200,
            message: "Get all clinic successfully",
            data: listClinic,
          });
        } else {
          resolve({
            status: 202,
            message: "Get all clinic failed",
            data: listClinic,
          });
        }
      } catch (error) {
        logger.doctor.error(error);
        reject(error);
      }
    });
  },
  checkRoleDoctor: (idPatient, idDoctor) => {
    return new Promise(async (resolve, reject) => {
      try {
        const role = await db.SharePatient.findOne({
          where: {
            idSharedPatient: idPatient,
            idOwnerDoctor: idDoctor,
          },
          attributes: ["roleOfOwnerDoctor"],
        });
        if (role) {
          resolve({
            status: 200,
            message: "Check role of owner doctor successfully",
            data: role.roleOfOwnerDoctor,
          });
        } else {
          resolve({
            status: 202,
            message: "Check role of owner doctor failed",
            data: null,
          });
        }
      } catch (error) {
        logger.doctor.error(error);
        reject(error);
      }
    });
  },
};

export default doctorServices;
