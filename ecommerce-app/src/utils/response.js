// Standardized response helpers.
const success = (res, data = {}, message = 'Success', status = 200) =>
  res.status(status).json({ success: true, message, data })

const error = (res, message = 'Error', status = 500, details) =>
  res.status(status).json({ success: false, message, details })

module.exports = { success, error }
