const db = require("../models");

const listOfIssueServices = {
  getListOfIssue: (idPatient) => {
    return new Promise((resolve, reject) => {
      try {
        const listOfIssue = db.ListOfIssue.findAll({
          where: {
            idPatient: idPatient
          }
        })
        if(listOfIssue.length>=0) {
          resolve({
            status: 200,
            message: 'get list of issues successfully',
            data: listOfIssue
          })
        }else{
          resolve({
            staus: 202,
            message: 'get list of issues failed',
            data: {}
          })
        }
      } catch (error) {
        reject(error);
      }
    })
  },
  createIssue: (idPatient,data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newIssue = {
          idPatient: idPatient,
          issue: data.issue,
          treatmentObject: data.treatmentObject,
          treatmentMethod: data.treatmentMethod,
          priotized: data.priotized
        }
        if(newIssue){
          resolve({
            status: 200,
            message: 'create issue successfully'
          })
        }else{
          resolve({
            status: 202,
            message: 'create issue failed'
          })
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  updateIssue: (idIssue,data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const dataUpdate = {
          issue: data.issue,
          treatmentObject: data.treatmentObject,
          treatmentMethod: data.treatmentMethod,
          priotized: data.priotized,
        }
        const newIssue = await db.ListOfIssue.update(dataUpdate,{
          where: {
            id: idIssue
          }
        })
        if(newIssue){
          resolve({
            status: 200,
            message: 'update issue successfully'
          })
        }else{
          resolve({
            status: 202,
            message: 'update issue failed'
          })
        }
      } catch (error) {
        reject(error);
      }
    })
  },
  deleteIssue: (idIssue) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deleteIssue = await db.ListOfIssue.destroy({
          where: {
            id: idIssue,
          },
          force: true
        });
        if(deleteIssue){
          resolve({
            status: 200,
            message: 'Delete issue successfully'
          })
        }else{
          resolve({
            status: 200,
            message: 'Delete issue failed'
          })
        }
      } catch (error) {
        reject(error);
      }
    })
  }
}

export default listOfIssueServices;