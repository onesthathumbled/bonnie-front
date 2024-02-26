import "../styles/Register.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("All fields are required.");
    } else {
      const userData = {
        email,
        password,
      };

      dispatch(login(userData));
    }
  };

  return (
    <div className="Register">
      <div className="RContainer">
        <div className="Logo RTitle">
          <a className="RLogo" href="/">
            <span className="logo-red">BO</span>
            <span className="logo-yellow">NN</span>
            <span className="logo-green">IE</span>
          </a>
          <p>Sign in here</p>
        </div>
        <form className="RForm" onSubmit={onSubmit}>
          <div className="RFormGroup">
            <label>Email</label>
            <br />
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="RFormGroup">
            <label>Password</label>
            <br />
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="RFormSubmit">
            <button type="submit">Sign In</button>
          </div>

          <div>
            <a href="/register" className="RFormLogin">
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
