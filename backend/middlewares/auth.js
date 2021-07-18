const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let payload;
  if (!req.cookies.jwt) {
    return next(new Error('Forbidden'));
  }
  try {
    payload = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET || 's-s-k');
  } catch (err) {
    next(new Error('No matches'));
  }
  req.user = payload;
  next();
};
