"use strict";
const db = require("../models");
import bcrypt from "bcrypt";
import logger from "../config/winston";

const authServices = {
  login: (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const doctor = await db.Doctor.findOne({
          where: { email: email },
          raw: true,
        });
        if (!doctor || Object.keys(doctor).length === 0) {
          resolve({
            data: null,
            message: "We couldn't find your email address",
          });
        }
        let validPassword = await bcrypt.compare(password, doctor.password);
        if (!validPassword) {
          resolve({
            data: null,
            message: "password wrong",
          });
        } else {
          delete doctor.password;
          resolve({
            data: doctor,
            message: "login successfully",
          });
        }
      } catch (error) {
        logger.doctor.error(error);
        reject(error);
      }
    });
  },
  logout: (idDoctor, refreshToken) => {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await db.RefreshToken.findOne({
          where: {
            idDoctor: idDoctor,
            token: refreshToken,
          },
        });
        if (token) {
          await db.RefreshToken.update(
            {
              isActive: false,
            },
            {
              where: {
                idDoctor: idDoctor,
                token: refreshToken,
              },
              force: true,
            }
          );
        }
        resolve({
          status: 200,
          message: "logout successfully",
        });
      } catch (error) {
        logger.token.error(error);
        reject(error);
      }
    });
  },
};

export default authServices;
