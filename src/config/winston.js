"use-strict";
import chalk from "chalk";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf, colorize } = format;

const customLevels = {
  levels: {
    error: 0,
    warning: 1,
    info: 2,
    debug: 3,
  },
  colors: {
    error: "red",
    warning: "yellow",
    info: "green",
    debug: "blue",
  },
};

const customFormat = combine(
  timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  printf(({ level, message, timestamp }) => {
    return `${chalk[customLevels.colors[level]](
      `[${timestamp}] - [${level}]: `
    )}${message}`;
  })
);

const logger = {
  app: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new transports.Console({ level: "info" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename: "./src/log/app/app-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
  doctor: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename: "./src/log/doctor/doctor-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
  clinic: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename: "./src/log/clinic/clinic-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
  token: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename: "./src/log/token/token-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
  passport: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename: "./src/log/passport/passport-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
  patient: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new transports.Console({ level: "info" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename: "./src/log/patient/patient-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
  diagnosis: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename: "./src/log/diagnosis/diagnosis-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
  extraoral: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename: "./src/log/extraoral/extraoral-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
  intraoral: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename: "./src/log/intraoral/intraoral-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
  history: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename: "./src/log/history/history-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
  listOfIssue: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename: "./src/log/listOfIssue/listOfIssue-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
  radiography: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename: "./src/log/radiography/radiography-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
  sharePatient: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename: "./src/log/sharePatient/sharePatient-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
  treatmentHistory: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename: "./src/log/treatmentHistory/treatmentHistory-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
  treatmentPlan: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename: "./src/log/treatmentPlan/treatmentPlan-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
  libraryImagePatient: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename:
          "./src/log/libraryImagePatient/libraryImagePatient-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
  roomOfClinic: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename: "./src/log/roomOfClinic/roomOfClinic-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
  servicesOfClinic: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename: "./src/log/servicesOfClinic/servicesOfClinic-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
  statusOfClinic: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename: "./src/log/statusOfClinic/statusOfClinic-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
  schedule: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename: "./src/log/schedule/schedule-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
  encryption: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename: "./src/log/encryption/encryption-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
  discussion: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename: "./src/log/discussion/discussion-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
  lateralCeph: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename: "./src/log/lateralCeph/lateralCeph-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
  activityHistory: createLogger({
    levels: customLevels.levels,
    format: customFormat,
    transports: [
      new transports.Console({ level: "error" }),
      new DailyRotateFile({
        format: combine(format.json()),
        filename: "./src/log/activityHistory/activityHistory-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d",
      }),
    ],
  }),
};

export default logger;
