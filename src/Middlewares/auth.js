const jwt = require("jsonwebtoken");

const reqAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization
      : undefined;
    if (!token) {
      return res.json({
        messge: "UnAuthorized",
      });
    }
    const decode = jwt.verify(token, process.env.JSON_WEB_KEY);
    next();
  } catch (error) {
    res.json({
      message: error
    })
  }
};

module.exports = reqAuth;
