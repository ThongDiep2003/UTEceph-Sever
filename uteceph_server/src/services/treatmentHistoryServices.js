const db = require("../models")

const treatmentHistoryServices = {
  getTreatmentHistory: (idPatient) => {
    return new Promise(async (resolve, reject) =>{
      try {
        const treatmentHistory = await db.TreatmentHistory.findAll({
          where: {
            id: idPatient
          }
        })
        if(treatmentHistory.length>=0){
          resolve({
            status: 200,
            message: 'get treatment history successfully',
            data: treatmentHistory
          })
        }else{
          resolve({
            status: 202,
            message: 'get treatment history failed',
            data: []
          })
        }
      } catch (error) {
        reject(error);
      }
    })
  },
  createTreatmentHistory: (idPatient,data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const treatmentHistory = await db.TreatmentHistory.create({
          idTreatmentHistory: idPatient,
          currentStatus: data.currentStatus,
          performedProcedures: data.performedProcedures,
          consultationDate: new Date(data.consultationDate)
        })
        if(treatmentHistory){
          resolve({
            status: 200,
            message: 'create treatment history successfully'
          })
        }else{
          resolve({
            status: 202,
            message: 'create treatment history failed'
          })
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  updateTreatmentHistory: (idHistory,data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const dataUpdate = {
          currentStatus: data.currentStatus,
          performedProcedures: data.performedProcedures,
          consultationDate: new Date(data.consultationDate)
        }
        const updateTreatmentHistory = await db.TreatmentHistory.update(dataUpdate,{
          where: {
            id: idHistory
          }
        })
        if(updateTreatmentHistory){
          resolve({
            status: 200,
            message: 'update treatment history successfully'
          })
        }else{
          resolve({
            status: 202,
            message: 'update treatment history failed'
          })
        }
      } catch (error) {
        reject(error);
      }
    })
  },
  deleteTreatmentHistory: (idHistory) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deleteTreatmentHistory = await db.TreatmentHistory.destroy({
          where: {
            id: idHistory
          },
          force: true
        })
        if(deleteTreatmentHistory){
          resolve({
            status: 200,
            message: 'delete treatment history successfully'
          })
        }else{
          resolve({
            status: 202,
            message: 'delete treatment history failed'
          })
        }
      } catch (error) {
        reject(error)
      }
    })
  } 
}


export default treatmentHistoryServices;