import React from "react";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import "../styles/Feed.css";

const Feed = () => {
  return (
    <div className="Feed">
      <div className="TopInfo">
        <div className="Information">
          <p className="InfoP">Information</p>
          <div className="Tasks">
            <div className="Backlog box">
              <p className="TBoxTitle">Backlog</p>
              <div className="TBoxNum">
                | 9 <span>Task</span>
              </div>
            </div>

            <div className="In-Progress box">
              <p className="TBoxTitle">In Progress</p>
              <div className="TBoxNum">
                | 8 <span>Task</span>
              </div>
            </div>

            <div className="Completed box">
              <p className="TBoxTitle">Completed</p>
              <div className="TBoxNum">
                | 11 <span>Task</span>
              </div>
            </div>
          </div>
        </div>

        <div className="Category">
          <div className="CategoryFlex">
            <p className="CategoryP">Category Task</p>
            <a href="/" className="CategoryA">
              See All Category
            </a>
          </div>

          <div className="CategoryList">
            <div className="CategoryBox">
              <p className="emoji">🔥</p>
              <div>
                <p className="CategoryText">Personal</p>
                <KeyboardArrowRightRoundedIcon className="CategoryIcs" />
              </div>
              <p className="CategoryNum">11 Tasks</p>
            </div>

            <div className="CategoryBox">
              <p className="emoji">🏢</p>
              <div>
                <p className="CategoryText">Business</p>
                <KeyboardArrowRightRoundedIcon className="CategoryIcs" />
              </div>
              <p className="CategoryNum">9 Tasks</p>
            </div>
          </div>
        </div>
      </div>

      <div className="Justline"></div>

      <div className="AllMyTasks">
        <div className="AMTcontainer">
          <p className="AMTtitle">
            All My Tasks<span className="AMTicon">✏️</span>
          </p>
          <a className="AMTlinker" href="/">
            See All Task
            <ArrowForwardRoundedIcon className="AMTlinkericon" />
          </a>
        </div>
        <p className="AMTp">Managing your tasks is easy with Task Management</p>
      </div>

      <div className="AllTasks">
        <div className="Task-Backlog">
          <div>
            <button>
              <p>Backlog</p>
              <p>9</p>
            </button>
            <MoreVertRoundedIcon />
          </div>
          <div className="Task1">
            <div>
              <p>Low</p>
              <MoreHorizRoundedIcon />
            </div>

            <p>Task Title</p>
            <p>I want to see task details here.</p>
            <p>Date here</p>
          </div>
        </div>

        <div className="Task-In-Progress">
          <div>
            <button>
              <p>In Progress</p>
              <p>8</p>
            </button>
            <MoreVertRoundedIcon />
          </div>
          <div className="Task1">
            <div>
              <p>High</p>
              <MoreHorizRoundedIcon />
            </div>

            <p>Task Title</p>
            <p>I want to see task details here.</p>
            <p>Date here</p>
          </div>
        </div>

        <div className="Task-Completed">
          <div>
            <button>
              <p>Completed</p>
              <p>11</p>
            </button>
            <MoreVertRoundedIcon />
          </div>
          <div className="Task1">
            <div>
              <p>Medium</p>
              <MoreHorizRoundedIcon />
            </div>

            <p>Task Title</p>
            <p>I want to see task details here.</p>
            <p>Date here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
