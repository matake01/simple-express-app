'use strict';

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

require('dotenv').config();

const customFormat = combine(
label({ label: 'app' }),
timestamp(),
printf(info => { return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`; })
);

const logger = createLogger({
  level: process.env.LOG_LEVEL,
  format: format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: 'log/error.log', level: 'error', format: customFormat }),
    new transports.File({ filename: 'log/combined.log', format: customFormat})
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: customFormat
  }));
}

module.exports = logger;
