require('dotenv').config();
const rateLimit = require('express-rate-limit');

const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10); // 15 minutes
const max = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10);

const limiter = rateLimit({
  windowMs,
  max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, please try again later',
  },
});

module.exports = limiter;
