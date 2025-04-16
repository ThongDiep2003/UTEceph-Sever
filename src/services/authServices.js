const db = require("../models");
import bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync(10);

const authServices = {
  login: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const doctor = await db.Doctor.findOne({
          where: { email: data.email},
          raw: true
        })
        if(!doctor){
          resolve({
            status: false,
            message: 'Could not find doctor email'
          })
        }
        let validPassword = await bcrypt.compare(data.password, doctor.password);
        if(!validPassword){
          resolve({
            staus: false,
            message: 'wrong password'
          })
        }
        delete doctor.password;
        resolve({
          status: true,
          message: 'login successfully',
          data: doctor
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default authServices;