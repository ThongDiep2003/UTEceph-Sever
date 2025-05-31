"use strict";
import logger from "../config/winston";
import db from "../models";

const servicesOfClinicServices = {
  getServicesClinic: (idClinic) => {
    return new Promise(async (resolve, reject) => {
      try {
        const listServices = await db.ServicesOfClinic.findAll({
          order: [["createdAt", "ASC"]],
          where: {
            idClinicService: idClinic,
          },
        });
        if (listServices.length >= 0) {
          resolve({
            status: 200,
            message: "get services from clinic successfully",
            data: listServices,
          });
        } else {
          resolve({
            status: 202,
            message: "get services from clinic failed",
            data: [],
          });
        }
      } catch (error) {
        logger.servicesOfClinic.error(error);
        reject(error);
      }
    });
  },
  createServices: (idClinic, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const createServicesClinic = await db.ServicesOfClinic.create({
          idClinicService: idClinic,
          nameService: data.nameService,
          priceService: data.priceService,
          colorService: data.colorService,
        });
        if (createServicesClinic) {
          const listServices = await db.ServicesOfClinic.findAll({
            order: [["createdAt", "ASC"]],
            where: {
              idClinicService: idClinic,
            },
          });
          resolve({
            status: 200,
            message: "create service successfully",
            data: listServices,
          });
        } else {
          resolve({
            status: 202,
            message: "create service failed",
            data: [],
          });
        }
      } catch (error) {
        logger.servicesOfClinic.error(error);
        reject(error);
      }
    });
  },
  updateService: (idClinic, idService, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateServiceClinic = await db.ServicesOfClinic.update(
          {
            nameService: data.nameService,
            colorService: data.colorService,
            priceService: data.priceService,
          },
          {
            where: {
              id: idService,
            },
          }
        );
        if (updateServiceClinic) {
          const listServices = await db.ServicesOfClinic.findAll({
            order: [["createdAt", "ASC"]],
            where: {
              idClinicService: idClinic,
            },
          });
          resolve({
            status: 200,
            message: "update service successfully",
            data: listServices,
          });
        } else {
          resolve({
            status: 202,
            message: "update service failed",
            data: [],
          });
        }
      } catch (error) {
        logger.servicesOfClinic.error(error);
        reject(error);
      }
    });
  },
  deleteService: (idClinic, idService) => {
    return new Promise(async (resolve, reject) => {
      try {
        const checkAppointmentWithService = await db.Schedule.findOne({
          where: {
            idService: idService,
          },
        });
        if (checkAppointmentWithService) {
          return resolve({
            status: 202,
            message:
              "This service cannot be deleted because it is being used to create an appointment",
          });
        }
        const deleteServiceClinic = await db.ServicesOfClinic.destroy({
          where: {
            id: idService,
          },
        });
        if (deleteServiceClinic) {
          const listServices = await db.ServicesOfClinic.findAll({
            order: [["createdAt", "ASC"]],
            where: {
              idClinicService: idClinic,
            },
          });
          resolve({
            status: 200,
            message: "delete service successfully",
            data: listServices,
          });
        } else {
          resolve({
            status: 202,
            message: "delete service failed",
            data: [],
          });
        }
      } catch (error) {
        logger.servicesOfClinic.error(error);
        reject(error);
      }
    });
  },
};

export default servicesOfClinicServices;
