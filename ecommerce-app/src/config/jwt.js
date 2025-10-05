require('dotenv').config()
const jwt = require('jsonwebtoken')

function generateToken (
  payload,
  expiresIn = process.env.JWT_EXPIRES_IN || '15m'
) {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not configured')
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn })
}

function verifyToken (token) {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not configured')
  return jwt.verify(token, process.env.JWT_SECRET)
}

function generateRefreshToken (
  payload,
  expiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d'
) {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET not configured')
  }
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn })
}

module.exports = { generateToken, verifyToken, generateRefreshToken }
