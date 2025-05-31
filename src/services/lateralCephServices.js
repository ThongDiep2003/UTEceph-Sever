const { default: logger } = require("../config/winston");
const db = require("../models");

const lateralCephServices = {
  getListFontSideImages: (idPatient) => {
    return new Promise(async (resolve, reject) => {
      try {
        const sideFaceImage = await db.LibraryImagePatient.findAll({
          order: [["createdAt", "DESC"]],
          where: {
            typeImage: 1,
            idPatientImage: idPatient,
          },
        });
        resolve({
          status: 200,
          message: "get list font side images successfully",
          data: sideFaceImage,
        });
      } catch (error) {
        logger.lateralCeph.error(error);
        reject(error);
      }
    });
  },
  getImageAnalysis: (idImage) => {
    return new Promise(async (resolve, reject) => {
      try {
        const analysis = await db.LateralCeph.findOne({
          where: {
            idImageAnalysis: idImage,
          },
        });
        if (analysis) {
          resolve({
            status: 200,
            message: "get analysis successfully",
            data: analysis,
          });
        } else {
          resolve({
            status: 200,
            message: "This photo has no analysis",
            data: null,
          });
        }
      } catch (error) {
        logger.lateralCeph.error(error);
        reject(error);
      }
    });
  },
  setImageAnalysis: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const checkImageAnalysis = await lateralCephServices.getImageAnalysis(
          data.idImageAnalysis
        );
        if (checkImageAnalysis?.data) {
          const dataUpdate = {
            markerPoints: JSON.stringify(data.markerPoints),
            scaleImage: data.scaleImage,
            lengthOfRuler: data.lengthOfRuler,
            noteAnalysis: data.noteAnalysis,
          };
          const updateImageAnalysis = await db.LateralCeph.update(dataUpdate, {
            where: {
              idImageAnalysis: data.idImageAnalysis,
            },
          });
          if (updateImageAnalysis) {
            resolve({
              status: 200,
              message: "update analysis successfully",
            });
          } else {
            resolve({
              status: 202,
              message: "update analysis failed",
            });
          }
        } else {
          const newAnalysis = await db.LateralCeph.create({
            idImageAnalysis: data.idImageAnalysis,
            markerPoints: JSON.stringify(data.markerPoints),
            scaleImage: data.scaleImage,
            lengthOfRuler: data.lengthOfRuler,
            noteAnalysis: data.noteAnalysis,
          });
          if (newAnalysis) {
            resolve({
              status: 200,
              message: "save analysis successfully",
            });
          } else {
            resolve({
              status: 202,
              message: "save analysis failed",
            });
          }
        }
      } catch (error) {
        logger.lateralCeph.error(error);
        reject(error);
      }
    });
  },
  deleteImageAnalysis: (idImage) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deleteImage = await db.LateralCeph.destroy({
          where: {
            idImageAnalysis: idImage,
          },
          force: true,
        });
        if (deleteImage) {
          resolve({
            status: 200,
            message: "delete analysis successfully",
          });
        } else {
          resolve({
            status: 202,
            message: "This photo has no analysis",
          });
        }
      } catch (error) {
        logger.lateralCeph.error(error);
        reject(error);
      }
    });
  },
};

export default lateralCephServices;
