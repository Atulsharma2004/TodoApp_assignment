import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { statusCode, JWT_TOKEN_KEY } from "../utils/constants.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const Login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(
      jsonGenerate(
        statusCode.VALIDATION_ERROR,
        "Validation Error",
        errors.mapped()
      )
    );
  }

  const { username, password } = req.body;
  //   const salt = await bcrypt.genSalt(10);
  //   const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.findOne({
    username: username,
  });
  if (!user) {
    return res.json(
      jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, "Invalid Credentials...")
    );
  }

  const verified = bcrypt.compareSync(password, user.password);

  if (!verified) {
    return res.json(
      jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, "Invalid Credentials...")
    );
  }

  const token = jwt.sign({ userId: user._id }, JWT_TOKEN_KEY);

  return res.json(
    jsonGenerate(statusCode.SUCCESS, "Logged in Successfully", {
      userId: user._id,
      token: token,
    })
  );

  //   res.send("login");
};

export default Login;
