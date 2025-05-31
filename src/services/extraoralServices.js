"use strict";
import logger from "../config/winston";

const db = require("../models");

const extraoralServices = {
  getExtraoral: (idPatient) => {
    return new Promise(async (resolve, reject) => {
      try {
        const extraoral = await db.ExtraOral.findOne({
          where: {
            idExtraOral: idPatient,
          },
        });
        const typesToSearch = [
          {
            id: 5,
            nameImage: "sideFace",
          },
          {
            id: 6,
            nameImage: "frontalFace",
          },
          {
            id: 7,
            nameImage: "obliqueFace",
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
        delete extraoral.idExtraOral;
        if (extraoral) {
          resolve({
            status: 200,
            message: "get extra-oral successfully",
            data: { ...extraoral, listImage },
          });
        } else {
          resolve({
            status: 202,
            message: "get extra-oral failed",
            data: null,
          });
        }
      } catch (error) {
        logger.extraoral.error(error);
        reject(error);
      }
    });
  },
  updateExtraoral: (idPatient, data) => {
    return new Promise(async (resolve, reject) => {
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
          incisalDisplayMaxillary: data.incisalDisplayMaxillary,
          incisalDisplayMandibular: data.incisalDisplayMandibular,
          smileArc: data.smileArc,
          restPositionIncisalDisplay: data.restPositionIncisalDisplay,
        };
        const extraoralUpdate = await db.ExtraOral.update(dataUpdate, {
          where: {
            idExtraOral: idPatient,
          },
        });
        if (extraoralUpdate) {
          const newExtraOral = await db.ExtraOral.findOne({
            where: {
              idExtraOral: idPatient,
            },
          });
          const typesToSearch = [
            {
              id: 5,
              nameImage: "sideFace",
            },
            {
              id: 6,
              nameImage: "frontalFace",
            },
            {
              id: 7,
              nameImage: "obliqueFace",
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
            message: "update extra-oral successfully",
            data: { ...newExtraOral, listImage },
          });
        } else {
          resolve({
            status: 202,
            message: "update extra-oral failed",
            data: null,
          });
        }
      } catch (error) {
        logger.extraoral.error(error);
        reject(error);
      }
    });
  },
};

export default extraoralServices;
