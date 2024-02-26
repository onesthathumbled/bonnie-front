import "../styles/Register.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { first_name, last_name, email, password, confirmPassword } = formData;

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

    if (
      !first_name.trim() ||
      !last_name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      toast.error("All fields are required.");
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
    } else {
      const userData = {
        first_name,
        last_name,
        email,
        password,
      };

      dispatch(register(userData));
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
          <p>Create an Account</p>
        </div>
        <form className="RForm" onSubmit={onSubmit}>
          <div className="RFormGroup">
            <label>First Name</label>
            <br />
            <input
              type="text"
              placeholder="Enter first name"
              name="first_name"
              value={first_name}
              onChange={onChange}
            />
          </div>

          <div className="RFormGroup">
            <label>Last Name</label>
            <br />
            <input
              type="text"
              placeholder="Enter last name"
              name="last_name"
              value={last_name}
              onChange={onChange}
            />
          </div>

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

          <div className="RFormGroup">
            <label>Confirm password</label>
            <br />
            <input
              type="password"
              placeholder="Enter password again"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
            />
          </div>

          <div className="RFormSubmit">
            <button type="submit">Sign Up</button>
          </div>

          <div>
            <a href="/login" className="RFormLogin">
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
