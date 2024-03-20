import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Todo from "../components/Todo.jsx";
import AddTodoModal from "../components/AddTodoModal.jsx";
import { useNavigate } from "react-router-dom";
import { getTodoList, getToken } from "../services/api.js";

const Home = () => {
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [refreshList, setRefreshList] = useState();

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
    }
    fetchTodoList();
  }, [refreshList]);

  async function fetchTodoList() {
    const result = await getTodoList();

    if (result.status == 200 && result.data.status === 200) {
      setList(result.data.data.todos.reverse());
    }
  }
  return (
    <>
      <Header />

      <div className="container">
        <div className="row justify-content-md-center mt-4">
          {list.map((todo) => (
            <Todo todo={todo} key={todo._id} setRefreshList={setRefreshList} />
          ))}
        </div>

        <div
          className=""
          style={{ position: "fixed", right: 50, bottom: 50, zIndex: 1030 }}
        >
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-outline-light"
          >
            Add
          </button>
        </div>
        <AddTodoModal setRefreshList={setRefreshList} />
      </div>
    </>
  );
};

export default Home;
