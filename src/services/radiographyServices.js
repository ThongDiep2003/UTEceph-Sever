"use strict";
import logger from "../config/winston";

const db = require("../models");

const radiographyServices = {
  getRadiography: (idPatient) => {
    return new Promise(async (resolve, reject) => {
      try {
        const radiography = await db.Radiography.findOne({
          where: {
            idRadiography: idPatient,
          },
        });
        const typesToSearch = [
          {
            id: 1,
            nameImage: "lateralImage",
          },
          {
            id: 3,
            nameImage: "panoramaImage",
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
        if (radiography) {
          resolve({
            status: 200,
            message: "get radiography successfully",
            data: { ...radiography, listImage },
          });
        } else {
          resolve({
            status: 202,
            message: "get radiography failed",
            data: {},
          });
        }
      } catch (error) {
        logger.radiography.error(error);
        reject(error);
      }
    });
  },
  updateRadiography: (idPatient, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const dataUpdate = {
          sinuses: data.sinuses,
          condyles: data.condyles,
          apparentPathology: data.apparentPathology,
          alveolarBoneHeights: data.alveolarBoneHeights,
          crownRootRatio: data.crownRootRatio,
          others: data.others,
          lateralCephalometricRadiography: data.lateralCephalometricRadiography,
          otherRadiography: data.otherRadiography,
        };
        const radiographyUpdate = await db.Radiography.update(dataUpdate, {
          where: {
            idRadiography: idPatient,
          },
        });
        if (radiographyUpdate) {
          const newRadiography = await db.Radiography.findOne({
            where: {
              idRadiography: idPatient,
            },
          });
          const typesToSearch = [
            {
              id: 1,
              nameImage: "lateralImage",
            },
            {
              id: 3,
              nameImage: "panoramaImage",
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
            message: "update radiography successfully",
            data: { ...newRadiography, listImage },
          });
        } else {
          resolve({
            status: 202,
            message: "update radiography failed",
            data: null,
          });
        }
      } catch (error) {
        logger.radiography.error(error);
        reject(error);
      }
    });
  },
};

export default radiographyServices;
