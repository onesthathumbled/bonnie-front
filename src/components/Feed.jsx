import React, { useEffect, useState } from "react";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import "../styles/Feed.css";
import { useSelector } from "react-redux";

const Feed = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

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
        <div className="Task-Backlog ATcon">
          <div className="BTNside">
            <button>
              <p className="ATbacklog">Backlog</p>
              <p className="ATnum1">9</p>
            </button>
            <MoreVertRoundedIcon className="ATics" />
          </div>
          <div className="Task1">
            <div>
              <p className="TaskStat low">Low</p>
              <MoreHorizRoundedIcon className="TaskMainIcs" />
            </div>

            <p className="TaskMainTitle">Task Title</p>
            <p className="TaskMainSub">I want to see task details here.</p>
            <p className="TaskMainDate">02/28/24</p>
          </div>
        </div>

        <div className="Task-In-Progress ATcon">
          <div className="BTNside">
            <button>
              <p className="ATinprogress">In Progress</p>
              <p className="ATnum2">8</p>
            </button>
            <MoreVertRoundedIcon className="ATics" />
          </div>
          <div className="Task1 ">
            <div>
              <p className="TaskStat high">High</p>
              <MoreHorizRoundedIcon className="TaskMainIcs" />
            </div>

            <p className="TaskMainTitle">Task Title</p>
            <p className="TaskMainSub">I want to see task details here.</p>
            <p className="TaskMainDate">02/28/24</p>
          </div>
        </div>

        <div className="Task-Completed ATcon">
          <div className="BTNside">
            <button>
              <p className="ATcompleted">Completed</p>
              <p className="ATnum3">11</p>
            </button>
            <MoreVertRoundedIcon className="ATics" />
          </div>
          <div className="Task1">
            <div>
              <p className="TaskStat medium">Medium</p>
              <MoreHorizRoundedIcon className="TaskMainIcs" />
            </div>

            <p className="TaskMainTitle">Task Title</p>
            <p className="TaskMainSub">I want to see task details here.</p>
            <p className="TaskMainDate">02/28/24</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
