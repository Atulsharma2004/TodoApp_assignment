import React, { useState } from "react";
import { toast } from "react-toastify";
import { createTodo } from "../services/api.js";

const AddTodoModal = ({ setRefreshList }) => {
  const [todoDesc, setTodoDesc] = useState("");

  const handleSubmit = async () => {
    if (todoDesc === "") {
      toast("Todo is required");
      return;
    }
    // console.log(todoDesc);
    else {
      const result = await createTodo({ desc: todoDesc });

      if (result.status == 200 && result.data.status === 200) {
        toast("Todo Added");
        setRefreshList(new Date());
        setTodoDesc("");
      } else {
        toast(result.data.message);
      }
    }
  };
  return (
    <>
      <div className="modal mt-5" id="exampleModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">Add New Todo</div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                area-label="close"
              >
                <span arial-hidden="true"></span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <textarea
                  placeholder="Enter Todos"
                  name=""
                  onChange={(e) => {
                    setTodoDesc(e.target.value);
                  }}
                  className="form-control"
                  rows={3}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={handleSubmit}
                data-bs-dismiss="modal"
              >
                Save Todo
              </button>
              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setTodoDesc("");
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default AddTodoModal;
