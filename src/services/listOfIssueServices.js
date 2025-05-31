"use strict";
import logger from "../config/winston";

const db = require("../models");

const listOfIssueServices = {
  getListOfIssue: (idPatient, page, pageSize) => {
    return new Promise(async (resolve, reject) => {
      try {
        const start = (page - 1) * pageSize;
        const count = await db.ListOfIssue.findAll({
          where: {
            idListOfIssue: idPatient,
          },
        });
        if (count.length === 0) {
          resolve({
            status: 200,
            message: "get list of issues successfully",
            data: [],
            count: count.length,
          });
          return;
        }
        const listOfIssue = await db.ListOfIssue.findAll({
          order: [["createdAt", "DESC"]],
          offset: start,
          limit: Number(pageSize),
          where: {
            idListOfIssue: idPatient,
          },
        });
        if (listOfIssue.length >= 0) {
          resolve({
            status: 200,
            message: "get list of issues successfully",
            data: listOfIssue,
            count: count.length,
          });
        } else {
          resolve({
            staus: 202,
            message: "get list of issues failed",
            data: {},
            count: 0,
          });
        }
      } catch (error) {
        logger.listOfIssue.error(error);
        reject(error);
      }
    });
  },
  createIssue: (idPatient, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newIssue = await db.ListOfIssue.create({
          idListOfIssue: idPatient,
          issue: data.issue,
          treatmentObject: data.treatmentObject,
          treatmentMethod: data.treatmentMethod,
          priotized: data.priotized,
        });
        if (newIssue) {
          const count = await db.ListOfIssue.findAll({
            where: {
              idListOfIssue: idPatient,
            },
          });
          const listOfIssue = await db.ListOfIssue.findAll({
            order: [["createdAt", "DESC"]],
            offset: 0,
            limit: Number(3),
            where: {
              idListOfIssue: idPatient,
            },
          });
          resolve({
            status: 200,
            message: "Create issue successfully",
            data: listOfIssue,
            count: count.length,
          });
        } else {
          resolve({
            status: 202,
            message: "create issue failed",
            data: null,
            count: 0,
          });
        }
      } catch (error) {
        logger.listOfIssue.error(error);
        reject(error);
      }
    });
  },
  updateIssue: (idPatient, idIssue, data, page, pageSize) => {
    return new Promise(async (resolve, reject) => {
      try {
        const dataUpdate = {
          issue: data.issue,
          treatmentObject: data.treatmentObject,
          treatmentMethod: data.treatmentMethod,
          priotized: data.priotized,
        };
        const newIssue = await db.ListOfIssue.update(dataUpdate, {
          where: {
            id: idIssue,
          },
        });
        if (newIssue) {
          const start = (page - 1) * pageSize;
          const count = await db.ListOfIssue.findAll({
            where: {
              idListOfIssue: idPatient,
            },
          });
          const listOfIssue = await db.ListOfIssue.findAll({
            order: [["createdAt", "DESC"]],
            offset: start,
            limit: Number(pageSize),
            where: {
              idListOfIssue: idPatient,
            },
          });
          resolve({
            status: 200,
            message: "Update issue successfully",
            data: listOfIssue,
            count: count.length,
          });
        } else {
          resolve({
            status: 202,
            message: "update issue failed",
            data: null,
            count: 0,
          });
        }
      } catch (error) {
        logger.listOfIssue.error(error);
        reject(error);
      }
    });
  },
  deleteIssue: (idPatient, idIssue) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deleteIssue = await db.ListOfIssue.destroy({
          where: {
            id: idIssue,
          },
          force: true,
        });
        if (deleteIssue) {
          const count = await db.ListOfIssue.findAll({
            where: {
              idListOfIssue: idPatient,
            },
          });
          const listOfIssue = await db.ListOfIssue.findAll({
            order: [["createdAt", "DESC"]],
            offset: 0,
            limit: Number(3),
            where: {
              idListOfIssue: idPatient,
            },
          });
          resolve({
            status: 200,
            message: "Delete issue successfully",
            data: listOfIssue,
            count: count.length,
          });
        } else {
          resolve({
            status: 200,
            message: "Delete issue failed",
            data: null,
            count: 0,
          });
        }
      } catch (error) {
        logger.listOfIssue.error(error);
        reject(error);
      }
    });
  },
};

export default listOfIssueServices;
