import React from "react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";

const RightBar = () => {
  return (
    <div className="RightBar">
      <div className="Tips">
        <div>
          <p>Tips</p>
          <MoreHorizRoundedIcon />
        </div>

        <div>
          <div className="Photo">Photo</div>
          <div className="Details">
            <p>Manage Your Daily Tasks.🙌</p>
            <p>
              This smart tool is designed to help you better manage your tasks.
            </p>
            <div>
              <div>
                <HorizontalRuleRoundedIcon />
                <HorizontalRuleRoundedIcon />
                <HorizontalRuleRoundedIcon />
              </div>

              <div>
                <KeyboardArrowRightRoundedIcon />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Calendar">
        <p>Calendar</p>
        <div>
          <p>February, 2024</p>
          <div>
            <KeyboardArrowLeftRoundedIcon />
            <KeyboardArrowRightRoundedIcon />
          </div>
        </div>
      </div>

      <div className="RecentActivities">
        <div>
          <p>Recent Activities</p>
          <a href="/">View Full</a>
        </div>

        <div className="Activity">
          <div>
            <p>Title of Task</p>
            <p>2 min ago</p>
          </div>
          <p>Details of the Task completed</p>
          <p>Complete Task⚡</p>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
