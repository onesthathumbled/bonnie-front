import React from "react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import "../styles/RightBar.css";

const RightBar = () => {
  return (
    <div className="RightBar">
      <div className="Tips">
        <div className="Tips-Top">
          <p>Tips</p>
          <MoreHorizRoundedIcon className="HorizonIcon" />
        </div>

        <div className="Details">
          <p className="Title">Manage Your Daily Task🙌</p>
          <p className="Sub">
            This smart tool is designed to help you better manage your tasks.
          </p>
          <div className="Ics">
            <div>
              <HorizontalRuleRoundedIcon className="FirstIc" fontSize="large" />
              <HorizontalRuleRoundedIcon fontSize="large" />
              <HorizontalRuleRoundedIcon fontSize="large" />
            </div>

            <div>
              <KeyboardArrowRightRoundedIcon className="ArrowIc" />
            </div>
          </div>
        </div>
      </div>

      <div className="RightBarHr"></div>

      <div className="RecentActivities">
        <div className="RCflex">
          <p className="Title">Recent Activities</p>
          <a href="/" className="RClink">
            View Full
          </a>
        </div>

        <div className="Activity">
          <div className="FirstTaskTitle">
            <p className="TaskTitle">Title of Task</p>
            <p className="TaskTime">2 min ago</p>
          </div>
          <p className="TaskDetails">Details of the Task completed</p>
          <p className="TaskStatus">Complete Task⚡</p>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
