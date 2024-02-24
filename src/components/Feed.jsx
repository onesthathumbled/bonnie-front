import React from "react";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

const Feed = () => {
  return (
    <div className="Feed">
      <div className="Tasks">
        <div className="Backlog">
          <p>Backlog</p>
          <div>| 9 Task</div>
        </div>

        <div className="In-Progress">
          <p>In Progress</p>
          <div>| 8 Task</div>
        </div>

        <div className="Completed">
          <p>Completed</p>
          <div>| 11 Task</div>
        </div>
      </div>

      <div>
        <p>Category Task</p>
        <a href="/">See All Category</a>
      </div>

      <div>
        <div className="Personal">
          <p>🔥</p>
          <div>
            <p>Personal</p>
            <KeyboardArrowRightRoundedIcon />
          </div>
          <p>11 Tasks</p>
        </div>

        <div className="Personal">
          <p>🏢</p>
          <div>
            <p>Business</p>
            <KeyboardArrowRightRoundedIcon />
          </div>
          <p>9 Tasks</p>
        </div>
      </div>

      <div>
        <div>
          <p>All My Tasks✏️</p>
          <a href="/">
            See All Task
            <ArrowForwardRoundedIcon />
          </a>
        </div>
        <p>Managing your tasks is easy with Task Management</p>
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
