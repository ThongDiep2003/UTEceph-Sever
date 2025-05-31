"use strict";
import logger from "../config/winston";

const db = require("../models");

const intraoralServices = {
  getIntraoral: (idPatient) => {
    return new Promise(async (resolve, reject) => {
      try {
        const intraoral = await db.IntraOral.findOne({
          where: {
            idIntraOral: idPatient,
          },
        });
        const typesToSearch = [
          {
            id: 10,
            nameImage: "rightBuccalImage",
          },
          {
            id: 11,
            nameImage: "leftBuccalImage",
          },
          {
            id: 12,
            nameImage: "anteriorImage",
          },
          {
            id: 13,
            nameImage: "maxillaryImage",
          },
          {
            id: 14,
            nameImage: "mandibularImage",
          },
          {
            id: 8,
            nameImage: "smileyFace",
          },
        ];
        const listImage = {};
        for (const type of typesToSearch) {
          const image = await db.LibraryImagePatient.findOne({
            attributes: ["linkImage"],
            where: {
              typeImage: type.id,
              idPatientImage: idPatient,
            },
          });
          listImage[type.nameImage] = image ? image.linkImage : null;
        }
        if (intraoral) {
          resolve({
            status: 200,
            message: "get intra-oral successfully",
            data: { ...intraoral, listImage },
          });
        } else {
          resolve({
            status: 202,
            message: "get intra-oral failed",
            data: {},
          });
        }
      } catch (error) {
        logger.intraoral.error(error);
        reject(error);
      }
    });
  },
  updateIntraoral: (idPatient, data) => {
    return new Promise(async (resolve, reject) => {
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
          deviate: data.deviate,
          crCoDiscrepancy: data.crCoDiscrepancy,
          maximumMouthOpening: data.maximumMouthOpening,
          guidanceOnProtrusion: data.guidanceOnProtrusion,
          guidanceOnRight: data.guidanceOnRight,
          guidanceOnLeft: data.guidanceOnLeft,
          musculature: data.musculature,
          swallowingPattern: data.swallowingPattern,
          historyOfTMD: data.historyOfTMD,
        };
        const intraoralUpdate = await db.IntraOral.update(dataUpdate, {
          where: {
            idIntraOral: idPatient,
          },
        });
        if (intraoralUpdate) {
          const newIntraoral = await db.IntraOral.findOne({
            where: {
              idIntraOral: idPatient,
            },
          });
          const typesToSearch = [
            {
              id: 10,
              nameImage: "rightBuccalImage",
            },
            {
              id: 11,
              nameImage: "leftBuccalImage",
            },
            {
              id: 12,
              nameImage: "anteriorImage",
            },
            {
              id: 13,
              nameImage: "maxillaryImage",
            },
            {
              id: 14,
              nameImage: "mandibularImage",
            },
            {
              id: 8,
              nameImage: "smileyFace",
            },
          ];
          const listImage = {};
          for (const type of typesToSearch) {
            const image = await db.LibraryImagePatient.findOne({
              attributes: ["linkImage"],
              where: {
                typeImage: type.id,
                idPatientImage: idPatient,
              },
            });
            listImage[type.nameImage] = image ? image.linkImage : null;
          }
          resolve({
            status: 200,
            message: "update intra-oral successfully",
            data: { ...newIntraoral, listImage },
          });
        } else {
          resolve({
            status: 202,
            message: "update intra-oral failed",
            data: null,
          });
        }
      } catch (error) {
        logger.intraoral.error(error);
        reject(error);
      }
    });
  },
};

export default intraoralServices;
