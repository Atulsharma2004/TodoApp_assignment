import { validationResult } from "express-validator";
import { statusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";
import Todo from "../models/Todo.js";
import User from "../models/User.js";

export const RemoveTodo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(
      jsonGenerate(
        statusCode.VALIDATION_ERROR,
        "Todo id is required",
        errors.mapped()
      )
    );
  }

  try {
    const result = Todo.findOneAndDelete({
      userId: req.userId,
      _id: req.body.todo_id,
    });

    if (result) {
      const user = await User.findOneAndUpdate(
        {
          _id: req.userId,
        },
        {
          $pull: { todos: req.body.todo_id },
        }
      );

      return res.json(
        jsonGenerate(statusCode.SUCCESS, "Todo deleted successfully", null)
      );
    }
  } catch (error) {
    return res.json(
      jsonGenerate(
        statusCode.UNPROCESSABLE_ENTITY,
        "Todo couldn't be deleted",
        null
      )
    );
  }
};
