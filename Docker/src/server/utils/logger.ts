import * as winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { Request, Response, NextFunction } from "express";

// Init transports
const consoleTransport = new winston.transports.Console();
/* const applicationTransport = new DailyRotateFile({
    filename: "application-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "1m",
  });
  const errorTransport = new DailyRotateFile({
    filename: "error-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "1m",
    level: "error",
  }); */

//formatter
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${
    typeof message === "object" ? JSON.stringify(message) : message
  }`;
});

const myWinstonOptions = {
  format: combine(timestamp(), myFormat),
  transports: [consoleTransport /* applicationTransport, errorTransport */],
};
const logger = winston.createLogger(myWinstonOptions);

export function logRequest(req: Request, res: Response, next: NextFunction) {
  logger.info(`${req.method}:${req.url}`);
  next();
}

export default logger;
 