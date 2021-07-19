const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let payload;
  if (!req.cookies.jwt) {
    return res.status(401).send({ message: 'Неправильный логин или пароль' });
  }
  // console.log(req.cookies.jwt, '123314');
  try {
    payload = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET || 'ssss-ssss-k');
  } catch (err) {
    next(new Error('No matches'));
  }
  req.user = payload;
  next();
};
