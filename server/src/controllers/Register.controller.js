import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { statusCode, JWT_TOKEN_KEY } from "../utils/constants.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const Register = async (req, res) => {
  //   const errors = validationResult(req);
  //   if (errors.isEmpty()) {
  //     const { name, username, email, password } = req.body;
  //     const salt = await bcrypt.genSalt(10);
  //     const hashPassword = await bcrypt.hash(password, salt);

  //     const userExist = await User.find({
  //       $or: [
  //         {
  //           email: email,
  //         },
  //         {
  //           username: username,
  //         },
  //       ],
  //     });
  //     if (userExist) {
  //       res.json(
  //         jsonGenerate(
  //           statusCode.UNPROCESSABLE_ENTITY,
  //           "User or email already exists"
  //         )
  //       );
  //     }
  //     try {
  //       const result = await User.create({
  //         name: name,
  //         username: username,
  //         email: email,
  //         password: hashPassword,
  //       });

  //       res.json(
  //         jsonGenerate(statusCode.SUCCESS, "Registered Successfully", result)
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   res.json(
  //     jsonGenerate(
  //       statusCode.VALIDATION_ERROR,
  //       "Validation Error",
  //       errors.mapped()
  //     )
  //   );
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

  const { name, username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const userExist = await User.findOne({
    $or: [
      {
        email: email,
      },
      {
        username: username,
      },
    ],
  });
  if (userExist) {
    return res.json(
      jsonGenerate(
        statusCode.UNPROCESSABLE_ENTITY,
        "User or email already exists"
      )
    );
  }

  try {
    const newUser = await User.create({
      name: name,
      username: username,
      email: email,
      password: hashPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, JWT_TOKEN_KEY);

    return res.json(
      jsonGenerate(statusCode.SUCCESS, "Registered Successfully", {
        userId: newUser._id,
        token: token,
      })
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        jsonGenerate(statusCode.INTERNAL_SERVER_ERROR, "Internal Server Error")
      );
  }
};

export default Register;
