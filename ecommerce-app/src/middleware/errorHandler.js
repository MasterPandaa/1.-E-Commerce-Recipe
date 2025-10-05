const multer = require('multer')
const { error } = require('../utils/response')
const logger = require('../utils/logger')

module.exports = (err, req, res, next) => {
  const isDev = (process.env.NODE_ENV || 'development') === 'development'

  // Log error
  if (isDev) {
    logger.error(err.stack || err.message || err)
  } else {
    logger.error(err.message || 'Unhandled error')
  }

  // Multer upload errors
  if (err instanceof multer.MulterError) {
    return error(res, err.message || 'Upload error', 400)
  }

  // JWT errors
  if (err.name === 'TokenExpiredError') {
    return error(res, 'Token expired', 401)
  }
  if (err.name === 'JsonWebTokenError') {
    return error(res, 'Invalid token', 401)
  }

  // MySQL common errors
  if (err.code === 'ER_DUP_ENTRY') {
    return error(res, 'Duplicate entry', 409)
  }

  // Validation errors should be sent earlier by validation middleware
  if (err.status && err.message) {
    return error(res, err.message, err.status)
  }

  // Fallback
  const details = isDev ? { stack: err.stack, raw: err.message } : undefined
  return error(res, 'Internal Server Error', 500, details)
}
