const jwt = require('jsonwebtoken');

module.exports = func = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.THE_SECRET);
    req.UserData = decoded;
    next();
  } catch (err) {
    res.status(409).json({ error: err });
  }
};
