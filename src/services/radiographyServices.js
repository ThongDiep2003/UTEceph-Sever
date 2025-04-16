const db = require("../models");

const radiographyServices = {
  getRadiography: (idPatient) => {
    return new Promise(async (resolve, reject) => {
      try {
        const radiography = await db.Radiography.findOne({
          where: {
            idRadiography: idPatient
          }
        })
        if(radiography){
          resolve({
            status: 200,
            message: 'get radiography successfully',
            data: radiography
          })
        }else{
          resolve({
            status: 202,
            message: 'get radiography failed',
            data: {}
          })
        }
      } catch (error) {
        reject(error)
      }
    })
  },
  updateRadiography: (idPatient,data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const dataUpdate = {
          sinuses: data.sinuses,
          condyles: data.condyles,
          apparentPathology: data.apparentPathology,
          alveolarBoneHeights: data.alveolarBoneHeights,
          crownRootRatio: data.crownRootRatio,
          others: data.others,
          laterakCephalometricRadiography: data.laterakCephalometricRadiography,
          otherRadiography: data.otherRadiography
        }
        const radiographyUpdate = await db.Radiography.update(dataUpdate,{
          where: {
            idRadiography: idPatient
          }
        })
        if(radiographyUpdate){
          resolve({
            status: 200,
            message: 'update radiography successfully'
          })
        }else{
          resolve({
            status: 202,
            message: 'update radiography failed'
          })
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default radiographyServices;