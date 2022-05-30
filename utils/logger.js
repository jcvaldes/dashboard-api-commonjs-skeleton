const winston = require('winston')
const newrelicFormatter = require('@newrelic/winston-enricher')(winston)
const NewrelicWinston = require('newrelic-winston')
const options = {
  level: process.env.LOG_LEVEL || 'debug',
  maxsize: 5242880, // 5MB
  format: winston.format.combine(
    winston.format.splat(),
    newrelicFormatter(),
    winston.format.prettyPrint(),
    winston.format.colorize()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880,
    }),
    new winston.transports.File({
      filename: 'logs/warning.log',
      level: 'warn',
      maxsize: 5242880,
    }),
    new winston.transports.File({
      filename: 'logs/info.log',
      maxsize: 5242880,
    }),
  ],
}
winston.add(new NewrelicWinston(options))
const logger = winston.createLogger(options)

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  )
}

module.exports = logger
