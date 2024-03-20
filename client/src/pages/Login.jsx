import React, { useEffect, useState } from "react";
import { login } from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header.jsx";

const Login = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
    // console.log("user", user);
  }, []);

  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form);

    // console.log("form", form);
    setErrors(null);

    if (result.status == 200) {
      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        toast(result.data.message);
        navigate("/");
        return;
      }

      if (result.data.status === 201) {
        setErrors(result.data.data);
        toast(result.data.message);
        return;
      }
      if (result.data.status === 202) {
        toast(result.data.message);
        return;
      }
    } else {
      toast("Something went wrong");
    }
  };
  return (
    <>
      <Header />
      <div className="container">
        <div
          className="row justify-content-md-center  "
          style={{ marginTop: "10%" }}
        >
          <div className="col-lg-5 card border-primary mb-3">
            <form action="" className="" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                  Username
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="username"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                {errors?.username && (
                  <small id="emailHelp" className=" text-danger">
                    {errors.username.msg}
                  </small>
                )}
              </div>
              <div>
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label mt-4"
                >
                  Password
                </label>
                <input
                  type="password"
                  onChange={handleChange}
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
                {errors?.password && (
                  <small id="emailHelp" className="  text-danger">
                    {errors.password.msg}
                  </small>
                )}
              </div>
              <div className="mt-4">
                <button type="submit" className="btn btn-outline-primary w-100">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
