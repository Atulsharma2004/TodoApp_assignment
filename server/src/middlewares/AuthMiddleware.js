import { JWT_TOKEN_KEY, statusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";
import jwt from "jsonwebtoken";

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */

const AuthMiddleware = (req, res, next) => {
  if (req.headers["auth"] === undefined) {
    return res.json(jsonGenerate(statusCode.AUTH_ERROR, "Access Denied"));
  }

  const token = req.headers["auth"];

  try {
    const decoded = jwt.verify(token, JWT_TOKEN_KEY);
    // console.log(decoded);
    req.userId = decoded.userId;
    return next();
  } catch (error) {
    return res.json(
      jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, "Invalid Token")
    );
  }
};

export default AuthMiddleware;
