"use strict";
import { FILE_CHANGE } from "../common/utility";
import logger from "../config/winston";
import activityHistoryServices from "../services/activityHistoryServices";
import libraryImagePatientServices from "../services/libraryImagePatientServices";
import patientServices from "../services/patientServices";

const libraryImagePatientController = {
  getListImage: async (req, res) => {
    try {
      const role = req.checkRole;
      if (req.query.typeImages === "radiography") {
        const { status, message, data } =
          await libraryImagePatientServices.getListImage(
            req.params.id,
            [1, 2, 3, 4]
          );
        res.status(status).json({
          message: message,
          data: data,
          roleOfDoctor: role,
        });
      } else if (req.query.typeImages === "extraoral") {
        const { status, message, data } =
          await libraryImagePatientServices.getListImage(
            req.params.id,
            [5, 6, 7, 8, 9]
          );
        res.status(status).json({
          message: message,
          data: data,
          roleOfDoctor: role,
        });
      } else {
        const { status, message, data } =
          await libraryImagePatientServices.getListImage(
            req.params.id,
            [10, 11, 12, 13, 14, 15]
          );
        res.status(status).json({
          message: message,
          data: data,
          roleOfDoctor: role,
        });
      }
    } catch (error) {
      logger.libraryImagePatient.error(error);
      res.status(500).json({
        message: error,
      });
    }
  },
  uploadImage: async (req, res) => {
    try {
      if (req.checkRole === "view") {
        res.status(401).json({
          message: "You do not have permission to edit this patient",
        });
        return;
      }
      const { status, message, data } =
        await libraryImagePatientServices.upLoadImage(
          req.params.id,
          req.body,
          req.body.typeImages
        );

      await activityHistoryServices.addActivityHistory({
        idPatient: req.params.id,
        idDoctor: req.body.idDoctor,
        fileChange: FILE_CHANGE.IMAGE_LIBRARY,
        contentChange: "Tải lên ảnh điều trị cho bệnh nhân trong thư viện ảnh",
      });
      patientServices
        .saveUpdateDoctor(req.params.id, req.body.idDoctor)
        .finally(() => {
          res.status(status).json({
            message: message,
            data: data,
          });
        });
    } catch (error) {
      logger.libraryImagePatient.error(error);
      res.status(500).json({
        message: error,
      });
    }
  },
  updateArrayImagePatient: async (req, res) => {
    try {
      if (req.checkRole === "view") {
        res.status(401).json({
          message: "You do not have permission to edit this patient",
        });
        return;
      }
      const { status, message, data } =
        await libraryImagePatientServices.updateArrayImage(
          req.params.id,
          req.body.newDate,
          req.body.oldDate,
          req.body.typeImages
        );

      await activityHistoryServices.addActivityHistory({
        idPatient: req.params.id,
        idDoctor: req.body.idDoctor,
        fileChange: FILE_CHANGE.IMAGE_LIBRARY,
        contentChange: "Cập nhật ngày điều khám của ảnh cho bệnh nhân",
      });
      patientServices
        .saveUpdateDoctor(req.params.id, req.body.idDoctor)
        .finally(() => {
          res.status(status).json({
            message: message,
            data: data,
          });
        });
    } catch (error) {
      logger.libraryImagePatient.error(error);
      res.status(500).json({
        message: error,
      });
    }
  },
  updateImagePatient: async (req, res) => {
    try {
      if (req.checkRole === "view") {
        res.status(401).json({
          message: "You do not have permission to edit this patient",
        });
        return;
      }
      const { status, message, data } =
        await libraryImagePatientServices.updateImage(
          req.params.id,
          req.body.idImage,
          req.body.consultationDate,
          req.body.typeImage,
          req.body.linkImage,
          req.body.typeImages
        );

      await activityHistoryServices.addActivityHistory({
        idPatient: req.params.id,
        idDoctor: req.body.idDoctor,
        fileChange: FILE_CHANGE.IMAGE_LIBRARY,
        contentChange: "Cập nhật ảnh điều trị cho bệnh nhân trong thư viện ảnh",
      });
      patientServices
        .saveUpdateDoctor(req.params.id, req.body.idDoctor)
        .finally(() => {
          res.status(status).json({
            message: message,
            data: data,
          });
        });
    } catch (error) {
      logger.libraryImagePatient.error(error);
      res.status(500).json({
        message: error,
      });
    }
  },
  deleteImagePatient: async (req, res) => {
    try {
      if (req.checkRole === "view") {
        res.status(401).json({
          message: "You do not have permission to edit this patient",
        });
        return;
      }
      if (req.query.typeImages === "radiography") {
        const { status, message, data } =
          await libraryImagePatientServices.deleteImage(
            req.params.id,
            req.query.idImage,
            [1, 2, 3, 4]
          );

        await activityHistoryServices.addActivityHistory({
          idPatient: req.params.id,
          idDoctor: req.query.idDoctor,
          fileChange: FILE_CHANGE.IMAGE_LIBRARY,
          contentChange:
            "Xóa ảnh điều trị cận lâm sàng của bệnh nhân trong thư viện ảnh",
        });
        patientServices
          .saveUpdateDoctor(req.params.id, req.query.idDoctor)
          .finally(() => {
            res.status(status).json({
              message: message,
              data: data,
            });
          });
      } else if (req.query.typeImages === "extraoral") {
        const { status, message, data } =
          await libraryImagePatientServices.deleteImage(
            req.params.id,
            req.query.idImage,
            [5, 6, 7, 8, 9]
          );

        await activityHistoryServices.addActivityHistory({
          idPatient: req.params.id,
          idDoctor: req.query.idDoctor,
          fileChange: FILE_CHANGE.IMAGE_LIBRARY,
          contentChange:
            "Xóa ảnh điều trị ngoài mặt của bệnh nhân trong thư viện ảnh",
        });
        patientServices
          .saveUpdateDoctor(req.params.id, req.query.idDoctor)
          .finally(() => {
            res.status(status).json({
              message: message,
              data: data,
            });
          });
      } else {
        const { status, message, data } =
          await libraryImagePatientServices.deleteImage(
            req.params.id,
            req.query.idImage,
            [10, 11, 12, 13, 14, 15]
          );

        await activityHistoryServices.addActivityHistory({
          idPatient: req.params.id,
          idDoctor: req.query.idDoctor,
          fileChange: FILE_CHANGE.IMAGE_LIBRARY,
          contentChange:
            "Xóa ảnh điều trị trong miệng của bệnh nhân trong thư viện ảnh",
        });
        patientServices
          .saveUpdateDoctor(req.params.id, req.query.idDoctor)
          .finally(() => {
            res.status(status).json({
              message: message,
              data: data,
            });
          });
      }
    } catch (error) {
      logger.libraryImagePatient.error(error);
      res.status(500).json({
        message: error,
      });
    }
  },
};

export default libraryImagePatientController;
