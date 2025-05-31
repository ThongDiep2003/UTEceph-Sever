"use strict";
import toISODateString from "../common/utility";
import _ from "lodash";
import { Op } from "sequelize";

const { default: logger } = require("../config/winston");
const db = require("../models");

const libraryImagePatientServices = {
  getListImage: (idPatient, type) => {
    return new Promise(async (resolve, reject) => {
      try {
        const listImage = await db.LibraryImagePatient.findAll({
          order: [["consultationDate", "DESC"]],
          where: {
            idPatientImage: idPatient,
            typeImage: {
              [Op.or]: type,
            },
          },
        });
        if (listImage.length >= 0) {
          const listImageGroupByDate = _.groupBy(
            listImage,
            ({ consultationDate }) =>
              toISODateString(new Date(consultationDate))
          );
          logger.libraryImagePatient.info(listImageGroupByDate);
          resolve({
            status: 200,
            message: "get list image successfully",
            data: listImageGroupByDate,
          });
        } else {
          resolve({
            status: 202,
            message: "get list image failed",
          });
        }
      } catch (error) {
        logger.libraryImagePatient.error(error);
        reject(error);
      }
    });
  },
  upLoadImage: (idPatient, data, type) => {
    return new Promise(async (resolve, reject) => {
      try {
        const image = await db.LibraryImagePatient.create({
          idPatientImage: idPatient,
          linkImage: data.linkImage,
          typeImage: data.typeImage,
          consultationDate: new Date(data.consultationDate),
        });
        if (image) {
          const listImage = await db.LibraryImagePatient.findAll({
            order: [["consultationDate", "DESC"]],
            where: {
              idPatientImage: idPatient,
              typeImage: {
                [Op.or]: type,
              },
            },
          });
          const listImageGroupByDate = _.groupBy(
            listImage,
            ({ consultationDate }) =>
              toISODateString(new Date(consultationDate))
          );
          logger.libraryImagePatient.info(listImageGroupByDate);
          resolve({
            status: 200,
            message: "upload image successfully",
            data: listImageGroupByDate,
          });
        } else {
          resolve({
            status: 202,
            message: "upload image failed",
          });
        }
      } catch (error) {
        logger.libraryImagePatient.error(error);
        reject(error);
      }
    });
  },
  updateImage: (
    idPatient,
    idImage,
    consultationDate,
    typeImage,
    linkImage,
    type
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateImagePatient = await db.LibraryImagePatient.update(
          {
            consultationDate: new Date(consultationDate),
            typeImage: typeImage,
            linkImage: linkImage,
          },
          {
            where: {
              id: idImage,
            },
          }
        );
        if (updateImagePatient) {
          const listImage = await db.LibraryImagePatient.findAll({
            order: [["consultationDate", "DESC"]],
            where: {
              idPatientImage: idPatient,
              typeImage: {
                [Op.or]: type,
              },
            },
          });
          const listImageGroupByDate = _.groupBy(
            listImage,
            ({ consultationDate }) =>
              toISODateString(new Date(consultationDate))
          );
          logger.libraryImagePatient.info(listImageGroupByDate);
          resolve({
            status: 200,
            message: "update image successfully",
            data: listImageGroupByDate,
          });
        }
      } catch (error) {
        logger.libraryImagePatient.error(error);
        reject(error);
      }
    });
  },
  updateArrayImage: (idPatient, newDate, oldDate, type) => {
    return new Promise(async (resolve, reject) => {
      try {
        const whereCondition = {
          consultationDate: {
            [Op.gte]: new Date(oldDate),
            [Op.lt]: new Date(
              new Date(oldDate).getTime() + 24 * 60 * 60 * 1000
            ),
          },
          typeImage: {
            [Op.or]: type,
          },
          idPatientImage: idPatient,
        };
        const updateArrayImage = await db.LibraryImagePatient.update(
          {
            consultationDate: new Date(newDate),
          },
          {
            where: whereCondition,
          }
        );
        if (updateArrayImage) {
          const listImage = await db.LibraryImagePatient.findAll({
            order: [["consultationDate", "DESC"]],
            where: {
              idPatientImage: idPatient,
              typeImage: {
                [Op.or]: type,
              },
            },
          });
          const listImageGroupByDate = _.groupBy(
            listImage,
            ({ consultationDate }) =>
              toISODateString(new Date(consultationDate))
          );
          logger.libraryImagePatient.info(listImageGroupByDate);
          resolve({
            status: 200,
            message: "update image successfully",
            data: listImageGroupByDate,
          });
        }
      } catch (error) {
        logger.libraryImagePatient.error(error);
        reject(error);
      }
    });
  },
  deleteImage: (idPatient, idImage, type) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db.LateralCeph.destroy({
          where: {
            idImageAnalysis: idImage,
          },
          force: true,
        });
        const deleteImagePatient = await db.LibraryImagePatient.destroy({
          where: {
            id: idImage,
          },
          force: true,
        });
        if (deleteImagePatient) {
          const listImage = await db.LibraryImagePatient.findAll({
            order: [["consultationDate", "DESC"]],
            where: {
              idPatientImage: idPatient,
              typeImage: {
                [Op.or]: type,
              },
            },
          });
          const listImageGroupByDate = _.groupBy(
            listImage,
            ({ consultationDate }) =>
              toISODateString(new Date(consultationDate))
          );
          logger.libraryImagePatient.info(listImageGroupByDate);
          resolve({
            status: 200,
            message: "delete image successfully",
            data: listImageGroupByDate,
          });
        }
      } catch (error) {
        logger.libraryImagePatient.error(error);
        reject(error);
      }
    });
  },
};

export default libraryImagePatientServices;
