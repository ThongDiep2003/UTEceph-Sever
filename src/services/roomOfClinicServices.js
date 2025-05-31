"use strict";
import logger from "../config/winston";
import db from "../models";

const roomOfClinicServices = {
  getRoomClinic: (idClinic) => {
    return new Promise(async (resolve, reject) => {
      try {
        const listRoom = await db.RoomOfClinic.findAll({
          order: [["createdAt", "ASC"]],
          where: {
            idClinicRoom: idClinic,
          },
        });
        if (listRoom.length >= 0) {
          resolve({
            status: 200,
            message: "get rooms from clinic successfully",
            data: listRoom,
          });
        } else {
          resolve({
            status: 202,
            message: "get rooms from clinic failed",
            data: [],
          });
        }
      } catch (error) {
        logger.roomOfClinic.error(error);
        reject(error);
      }
    });
  },
  createRoom: (idClinic, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const createRoomClinic = await db.RoomOfClinic.create({
          idClinicRoom: idClinic,
          nameRoom: data.nameRoom,
          colorRoom: data.colorRoom,
        });
        if (createRoomClinic) {
          const listRoom = await db.RoomOfClinic.findAll({
            order: [["createdAt", "ASC"]],
            where: {
              idClinicRoom: idClinic,
            },
          });
          resolve({
            status: 200,
            message: "create room successfully",
            data: listRoom,
          });
        } else {
          resolve({
            status: 202,
            message: "create room failed",
            data: [],
          });
        }
      } catch (error) {
        logger.roomOfClinic.error(error);
        reject(error);
      }
    });
  },
  updateRoom: (idClinic, idRoom, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateRoomClinic = await db.RoomOfClinic.update(
          {
            nameRoom: data.nameRoom,
            colorRoom: data.colorRoom,
          },
          {
            where: {
              id: idRoom,
            },
          }
        );
        if (updateRoomClinic) {
          const listRoom = await db.RoomOfClinic.findAll({
            order: [["createdAt", "ASC"]],
            where: {
              idClinicRoom: idClinic,
            },
          });
          resolve({
            status: 200,
            message: "update room successfully",
            data: listRoom,
          });
        } else {
          resolve({
            status: 202,
            message: "update room failed",
            data: [],
          });
        }
      } catch (error) {
        logger.roomOfClinic.error(error);
        reject(error);
      }
    });
  },
  deleteRoom: (idClinic, idRoom) => {
    return new Promise(async (resolve, reject) => {
      try {
        const checkAppointmentWithRoom = await db.Schedule.findOne({
          where: {
            idRoom: idRoom,
          },
        });
        if (checkAppointmentWithRoom) {
          return resolve({
            status: 202,
            message:
              "This room cannot be deleted because it is being used to create an appointment",
          });
        }
        const deleteRoomClinic = await db.RoomOfClinic.destroy({
          where: {
            id: idRoom,
          },
        });
        if (deleteRoomClinic) {
          const listRoom = await db.RoomOfClinic.findAll({
            order: [["createdAt", "ASC"]],
            where: {
              idClinicRoom: idClinic,
            },
          });
          resolve({
            status: 200,
            message: "delete room successfully",
            data: listRoom,
          });
        } else {
          resolve({
            status: 202,
            message: "delete room failed",
            data: [],
          });
        }
      } catch (error) {
        logger.roomOfClinic.error(error);
        reject(error);
      }
    });
  },
};

export default roomOfClinicServices;
