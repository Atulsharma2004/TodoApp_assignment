import React from "react";
// import moment from "moment/moment";
import moment from "moment";
import { deleteTodo, markTodo } from "../services/api.js";
import { toast } from "react-toastify";

const Todo = ({ todo, setRefreshList }) => {
  const handleDelete = async () => {
    const result = await deleteTodo({
      todo_id: todo._id,
    });

    if (result.data.status === 200) {
      setRefreshList(new Date());
      toast("Deleted");
    } else {
      toast("Failed to delete!, please try again");
    }
  };

  const handleMarkTodo = async () => {
    const result = await markTodo({
      todo_id: todo._id,
    });

    if (result.data.status === 200) {
      setRefreshList(new Date());
      toast(result.data.message);
    } else {
      toast("Failed to mark!, please try again");
    }
  };
  return (
    <>
      <div className="col-sm-3 mx-3 my-2 alert bg-light">
        <div className="card-header">
          {todo.isCompleted ? "Cpmpleted" : "Not Completed"}
        </div>
        <div className="card-body my-4">
          <h4 className="card-title mb-2">{todo.desc}</h4>
          <p className="card-text">{moment(todo.date).fromNow()}</p>
        </div>
        <div className="actionButtons d-flex justify-content-between align-items-center">
          <div className="deleteButton">
            <button
              className="bg-danger rounded text-light"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
          <div className="markTodo">
            <button className="rounded" onClick={handleMarkTodo}>
              {todo.isCompleted ? "Mark Uncomplete" : "Mark Complete"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
