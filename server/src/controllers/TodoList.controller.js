import User from "../models/User.js";
import { statusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";

export const GetTodos = async (req, res) => {
  try {
    const list = await User.findById(req.userId)
      .select("-password")
      .populate("todos")
      .exec();

    return res.json(jsonGenerate(statusCode.SUCCESS, "All todo List", list));
  } catch (error) {
    return res.json(
      jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, "Error in fetching", error)
    );
  }
};
