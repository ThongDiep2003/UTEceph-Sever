const db = require("../models")

const extraoralServices = {
  getExtraoral: (idPatient) => {
    return new Promise(async (resolve, reject) => {
      try {
        const extraoral = await db.ExtraOral.findOne({
          where: {
            idExtraOral:idPatient
          }
        })
        if(extraoral){
          resolve({
            status: 200,
            message: 'get extra-oral successfully',
            data: extraoral
          })
        }else{
          resolve({
            status: 202,
            message: 'get extra-oral failed',
            data: {}
          })
        }
      } catch (error) {
        reject(error)
      }
    })
  },
  updateExtraoral: (idPatient,data) => {
    return new Promise(async (resolve, reject) =>{
      try {
        const dataUpdate = {
          faceAsymetry: data.faceAsymetry,
          chin: data.chin,
          lipCompetence: data.lipCompetence,
          lipPostureApart: data.lipPostureApart,
          normalNaresExposure: data.normalNaresExposure,
          alarBaseWidth: data.alarBaseWidth,
          lipWidth: data.lipWidth,
          verticalDimensions: data.verticalDimensions,
          overallProfile: data.overallProfile,
          lowerThirdProfile: data.lowerThirdProfile,
          nasolabialAngle: data.nasolabialAngle,
          softTissuePogonion: data.softTissuePogonion,
          mandibularPlaneAngle: data.mandibularPlaneAngle,
          obliqueAnalysis: data.obliqueAnalysis,
          teethDisplay: data.teethDisplay,
          gingivalDisplayLevel: data.gingivalDisplayLevel,
          incisalDisplay: data.incisalDisplay,
          smileArc: data.smileArc,
          restPositionIncisalDisplay: data.restPositionIncisalDisplay
        }
        const extraoralUpdate = await db.ExtraOral.update(dataUpdate,{
          where: {
            idExtraOral: idPatient
          }
        })
        if(extraoralUpdate){
          resolve({
            status: 200,
            message: 'update extra-oral successfully'
          })
        }else{
          resolve({
            status: 202,
            message: 'update extra-oral failed'
          })
        }
      } catch (error) {
        reject(error);
      }
    })
  }
}

export default extraoralServices;