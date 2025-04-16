const db = require("../models")

const patientServices = {
  createNewPatient: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if(data.idDoctor){
          const newPatient = await db.Patient.create({
            fullName: data.fullName,
            birthday: new Date(data.birthday),
            idPatientOfDoctor: data.idDoctor
          });
          if(newPatient){
            const patientHistory = await db.History.create({idHistory: newPatient.id});
            const patientExtraOral = await db.ExtraOral.create({idExtraoral: newPatient.id});
            const patientIntraOral = await db.IntraOral.create({idIntraoral: newPatient.id});
            const patientRadiography = await db.Radiography.create({idRadiography: newPatient.id});
            const patientDiagnosisAndTreatment = await db.DiagnosisAndTreatment.create({idDiagnosisAndTreatment: newPatient.id});
            if(patientHistory && patientExtraOral && patientIntraOral && patientRadiography && patientDiagnosisAndTreatment) resolve({
              status: 200,
              message: 'create patient successfully'
            })
          }
        }else{
          const newPatient = await db.Patient.create({
            fullName: data.fullName,
            birthday: new Date(data.birthday),
            idPatientOfClinic: data.idClinic
          });
          if(newPatient){
            const patientHistory = await db.History.create({idHistory: newPatient.id});
            const patientExtraOral = await db.ExtraOral.create({idExtraoral: newPatient.id});
            const patientIntraOral = await db.IntraOral.create({idIntraoral: newPatient.id});
            const patientRadiography = await db.Radiography.create({idRadiography: newPatient.id});
            const patientDiagnosisAndTreatment = await db.DiagnosisAndTreatment.create({idDiagnosisAndTreatment: newPatient.id});
            if(patientHistory && patientExtraOral && patientIntraOral && patientRadiography && patientDiagnosisAndTreatment) resolve({
              status: 200,
              message: 'create patient successfully'
            })
          }
        }
        reject({
          status: 202,
          message: 'create patient failed'
        })
      } catch (error) {
        reject(error);
      }
    })
  },
  deletePatient: (idPatient) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db.History.destroy({where: {idHistory: idPatient}, force: true});
        await db.ExtraOral.destroy({where: {idExtraOral: idPatient}, force: true});
        await db.IntraOral.destroy({where: {idIntraOral: idPatient}, force: true});
        await db.Radiography.destroy({where: {idRadiography: idPatient}, force: true});
        await db.DiagnosisAndTreatment.destroy({where: {idDiagnosisAndTreatment: idPatient}, force: true});

        await db.ListOfIssue.destroy({where: {idListOfIssue: idPatient}, force: true});
        await db.TreatmentPlan.destroy({where: {idTreatmentPlan: idPatient}, force: true});
        await db.TreatmentHistory.destroy({where: {idTreatmentHistory: idPatient}, force: true});
        await db.SharePatient.destroy({where: {idSharedPatient: idPatient}, force: true});

        const deletePatient = await db.Patient.destroy({
          where: {
            id: idPatient
          }, 
          force: true
        })
        if(deletePatient){
          resolve({
            status: 200,
            message: 'Patient deleted successfully'
          })
        }else{
          resolve({
            status: 202,
            message: 'Patient deleted failed'
          })
        }
      } catch (error) {
        reject(error);
      }
    })
  },
  updateInformationPatient: (id,data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const dataUpdate = {
          fullName: data.fullName,
          gender: data.gender,
          birthday: new Date(data.birthday),
          consulationDate: new Date(data.consulationDate),
          phoneNumber: data.phoneNumber,
          address: data.address,
          chiefcomplaint: data.chiefcomplaint,
          note: data.note,
          updateByDoctor: data.idDoctorUpdate
        }
        const checkUpdatePatient = await db.Patient.update(dataUpdate,{
          where: {
            id: id
          }
        })
        if(checkUpdatePatient){
          resolve({
            status: 200,
            message: 'update information patient successfully'
          })
        }else{
          resolve({
            status: 202,
            message: 'update information patient failed'
          })
        }
      } catch (error) {
        reject(error);
      }
    })
  },
  saveUpdateDoctor: (idPatient,idDoctor) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newUpdateDoctor = await db.Patient.update({
          updateByDoctor: idDoctor
        },
        {
          where: {
            id: idPatient
          }
        })
        if(newUpdateDoctor) resolve();
      } catch (error) {
        reject(error);
      }
    })
  },
  getUpdateDoctor: (idPatient) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateDoctor = await db.Patient.findOne({
          attributes: ['updateByDoctor'],
          where: {
            id: idPatient
          }
        })
        if(updateDoctor) resolve(updateDoctor);
      } catch (error) {
        reject(error);
      }
    })
  }
}

export default patientServices;