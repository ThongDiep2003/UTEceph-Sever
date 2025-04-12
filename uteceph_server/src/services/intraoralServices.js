const db = require("../models")

const intraoralServices = {
  getIntraoral: (idPatient) => {
    return new Promise(async (resolve, reject) => {
      try {
        const intraoral = await db.IntraOral.findOne({
          where: {
            idIntraOral: idPatient
          }
        })
        if(intraoral){
          resolve({
            status: 200,
            message: 'get intra-oral successfully',
            data: intraoral
          })
        }else{
          resolve({
            status: 202,
            message: 'get intra-oral failed',
            data: {}
          })
        }
      } catch (error) {
        reject(error)
      }
    })
  },
  updateIntraoral: (idPatient,data) => {
    return new Promise(async (resolve, reject) =>{
      try {
        const dataUpdate = {
          oralHygiene: data.oralHygiene,
          dentition: data.dentition,
          caries: data.caries,
          missing: data.missing,
          wearingTeeth: data.wearingTeeth,
          detalAldevelopment: data.detalAldevelopment,
          otherProblems: data.otherProblems,
          archForm: data.archForm,
          rightCanine: data.rightCanine,
          rightMolar: data.rightMolar,
          leftCanine: data.leftCanine,
          leftMolar: data.leftMolar,
          overjet: data.overjet,
          overbite: data.overbite,
          curveOfSpee: data.curveOfSpee,
          cant: data.cant,
          posteriorRight: data.posteriorRight,
          posteriorLeft: data.posteriorLeft,
          upperMidline: data.upperMidline,
          lowerMidline: data.lowerMidline,
          crCoDiscrepancy: data.crCoDiscrepancy,
          maximumMouthOpening: data.maximumMouthOpening,
          guidanceOnProtrusion: data.guidanceOnProtrusion,
          guidanceOnRight: data.guidanceOnRight,
          guidanceOnLeft: data.guidanceOnLeft,
          musculature: data.musculature,
          swallowingPattern: data.swallowingPattern,
          historyOfTMD: data.historyOfTMD
        }
        const intraoralUpdate = await db.Intraoral.update(dataUpdate,{
          where: {
            idIntraOral: idPatient
          }
        })
        if(intraoralUpdate){
          resolve({
            status: 200,
            message: 'update intra-oral successfully'
          })
        }else{
          resolve({
            status: 202,
            message: 'update intra-oral failed'
          })
        }
      } catch (error) {
        reject(error);
      }
    })
  }
}

export default intraoralServices;