import React, { useEffect } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import "../styles/Navbar.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Navbar = () => {
  const activeLinkStyle = {
    color: "#fefefe",
  };

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const onLogout = (e) => {
    e.preventDefault();

    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="Navbar">
      <div className="Logo">
        <a href="/">
          <span className="logo-red">BO</span>
          <span className="logo-yellow">NN</span>
          <span className="logo-green">IE</span>
        </a>
      </div>

      <div className="Links">
        <NavLink
          to="/"
          style={location.pathname === "/" ? activeLinkStyle : {}}
          end
          className="GrayA"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/categories"
          style={location.pathname === "/categories" ? activeLinkStyle : {}}
          className="GrayA"
        >
          Categories
        </NavLink>
        <NavLink
          to="/tasks"
          style={location.pathname === "/tasks" ? activeLinkStyle : {}}
          className="GrayA"
        >
          Tasks
        </NavLink>
      </div>

      <div className="Form">
        <form className="Form-Group">
          <button>
            <SearchRoundedIcon className="SearchRounded" />
          </button>
          <input
            type="text"
            placeholder="Search name, category, task, etc..."
          />
        </form>
      </div>

      <div className="AddTask">
        <NotificationsRoundedIcon className="NotificationIcon" />
        <button className="NotificationButton">
          <p>Add Task</p>
          <AddRoundedIcon className="RoundedIcon" />
        </button>
      </div>

      <div className="Profile">
        <AccountCircleRoundedIcon className="AccountIcon" fontSize="large" />
        <div className="AccountBg">
          <p className="AccountName">
            {user && `${user.data.first_name} ${user.data.last_name}`}
          </p>
          <p className="AccountGreetings">Have a nice day!👋</p>
        </div>
      </div>

      <div className="Settings">
        <button className="SettingsButton" onClick={onLogout}>
          <SettingsRoundedIcon className="SettingsIcon" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
