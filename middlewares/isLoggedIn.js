const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

function isLoggedIn(req, res, next) {
  const token = getTokenFromHeader(req);
  const decoded = verifyToken(token);
  if (!decoded)
    throw new Error("Invalid or expired token, please logged in again");
  req.userAuthId = decoded?.id;
  next();
}
module.exports = isLoggedIn;
