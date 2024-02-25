import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import "../styles/Navbar.css";

const Navbar = () => {
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
        <a className="MyProjects" href="/">
          Dashboard
        </a>
        <a className="GrayA" href="/">
          Categories
        </a>
        <a className="GrayA" href="/">
          Tasks
        </a>
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
          <p className="AccountName">Jai Madera</p>
          <p className="AccountGreetings">Have a nice day!👋</p>
        </div>
      </div>

      <div className="Settings">
        <button className="SettingsButton">
          <SettingsRoundedIcon className="SettingsIcon" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
