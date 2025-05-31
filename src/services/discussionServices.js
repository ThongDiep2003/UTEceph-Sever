import logger from "../config/winston";

const db = require("../models");

const discussionServices = {
  getMessage: (idRoom, skip) => {
    return new Promise(async (resolve, reject) => {
      try {
        const listMessage = await db.Discussion.findAll({
          include: [
            {
              model: db.Doctor,
              attributes: ["email", "fullName"],
            },
          ],
          offset: skip,
          limit: 10,
          order: [["createdAt", "DESC"]],
          where: {
            idRoomDiscussionOfPatient: idRoom,
          },
          raw: true,
        });
        return resolve(listMessage);
      } catch (error) {
        logger.discussion.error(error);
        reject(error);
      }
    });
  },
  setMessage: (idRoom, idDoctor, message) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newMessage = await db.Discussion.create({
          idRoomDiscussionOfPatient: idRoom,
          idDoctorSendMessage: idDoctor,
          message: message,
        });
        const getNewMessage = await db.Discussion.findOne({
          include: [
            {
              model: db.Doctor,
              attributes: ["email", "fullName"],
            },
          ],
          where: {
            id: newMessage.dataValues.id,
          },
          raw: true,
        });
        return resolve(getNewMessage);
      } catch (error) {
        logger.discussion.error(error);
        reject(error);
      }
    });
  },
};

export default discussionServices;
