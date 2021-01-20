const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    if (!req.userData.isAdmin) {
      res
        .status(403)
        .json({ message: "Access not allowed Your are not Admin", error });
    } else {
      next();
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Access not allowed Your are not Admin", error });
  }
};
