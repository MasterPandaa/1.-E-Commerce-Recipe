const { verifyToken } = require('../config/jwt');
const { error } = require('../utils/response');

// Extract Bearer token from Authorization header
function getTokenFromHeader(req) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) return null;
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
  return parts[1];
}

function authenticateToken(req, res, next) {
  try {
    const token = getTokenFromHeader(req);
    if (!token) {
      return error(res, 'Authentication token missing', 401);
    }

    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      return next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return error(res, 'Token expired', 401);
      }
      return error(res, 'Invalid token', 401);
    }
  } catch (err) {
    return next(err);
  }
}

function authorizeRoles(...roles) {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return error(res, 'Unauthorized', 403);
      }
      if (!roles.includes(req.user.role)) {
        return error(res, 'Forbidden', 403);
      }
      return next();
    } catch (err) {
      return next(err);
    }
  };
}

module.exports = { authenticateToken, authorizeRoles };
