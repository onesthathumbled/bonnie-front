import React, { useEffect, useState } from "react";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import "../styles/Feed.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllTasks } from "../features/tasks/taskSlice";

const Feed = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const { all_tasks } = useSelector((state) => state.tasks);

  const sortedBacklog = all_tasks.filter(
    (task) => task.completion_status === "backlog"
  );
  const sortedInProgress = all_tasks.filter(
    (task) => task.completion_status === "in_progress"
  );
  const sortedCompleted = all_tasks.filter(
    (task) => task.completion_status === "completed"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllTasks());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="Feed">
      <div className="TopInfo">
        <div className="Information">
          <p className="InfoP">Information</p>
          <div className="Tasks">
            <div className="Backlog box">
              <p className="TBoxTitle">Backlog</p>
              <div className="TBoxNum">
                | {sortedBacklog.length} <span>Task</span>
              </div>
            </div>

            <div className="In-Progress box">
              <p className="TBoxTitle">In Progress</p>
              <div className="TBoxNum">
                | {sortedInProgress.length} <span>Task</span>
              </div>
            </div>

            <div className="Completed box">
              <p className="TBoxTitle">Completed</p>
              <div className="TBoxNum">
                | {sortedCompleted.length} <span>Task</span>
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
              <p className="ATnum1">{sortedBacklog.length}</p>
            </button>
            <MoreVertRoundedIcon className="ATics" />
          </div>
          {sortedBacklog &&
            sortedBacklog.map((task) => (
              <div className="Task1">
                <div>
                  <p
                    className={`TaskStat ${
                      task.priority === "low"
                        ? "low"
                        : task.priority === "medium"
                        ? "medium"
                        : "high"
                    }`}
                  >
                    {task.priority.charAt(0).toUpperCase() +
                      task.priority.slice(1)}
                  </p>
                  <MoreHorizRoundedIcon className="TaskMainIcs" />
                </div>

                <p className="TaskMainTitle">
                  {" "}
                  {(task.task_name ?? "").length > 30
                    ? `${task.task_name.slice(0, 30)}...`
                    : task.task_name}
                </p>
                <p className="TaskMainSub">
                  {" "}
                  {(task.task_details ?? "").length > 40
                    ? `${task.task_details.slice(0, 40)}...`
                    : task.task_details}
                </p>
                <p className="TaskMainDate">
                  {new Date(task.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
        </div>

        <div className="Task-In-Progress ATcon">
          <div className="BTNside">
            <button>
              <p className="ATinprogress">In Progress</p>
              <p className="ATnum2">{sortedInProgress.length}</p>
            </button>
            <MoreVertRoundedIcon className="ATics" />
          </div>
          {sortedInProgress &&
            sortedInProgress.map((task) => (
              <div className="Task1">
                <div>
                  <p
                    className={`TaskStat ${
                      task.priority === "low"
                        ? "low"
                        : task.priority === "medium"
                        ? "medium"
                        : "high"
                    }`}
                  >
                    {task.priority.charAt(0).toUpperCase() +
                      task.priority.slice(1)}
                  </p>
                  <MoreHorizRoundedIcon className="TaskMainIcs" />
                </div>

                <p className="TaskMainTitle">
                  {" "}
                  {(task.task_name ?? "").length > 30
                    ? `${task.task_name.slice(0, 30)}...`
                    : task.task_name}
                </p>
                <p className="TaskMainSub">
                  {" "}
                  {(task.task_details ?? "").length > 40
                    ? `${task.task_details.slice(0, 40)}...`
                    : task.task_details}
                </p>
                <p className="TaskMainDate">
                  {new Date(task.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
        </div>

        <div className="Task-Completed ATcon">
          <div className="BTNside">
            <button>
              <p className="ATcompleted">Completed</p>
              <p className="ATnum3">{sortedCompleted.length}</p>
            </button>
            <MoreVertRoundedIcon className="ATics" />
          </div>
          {sortedCompleted &&
            sortedCompleted.map((task) => (
              <div className="Task1">
                <div>
                  <p
                    className={`TaskStat ${
                      task.priority === "low"
                        ? "low"
                        : task.priority === "medium"
                        ? "medium"
                        : "high"
                    }`}
                  >
                    {task.priority.charAt(0).toUpperCase() +
                      task.priority.slice(1)}
                  </p>
                  <MoreHorizRoundedIcon className="TaskMainIcs" />
                </div>

                <p className="TaskMainTitle">
                  {" "}
                  {(task.task_name ?? "").length > 30
                    ? `${task.task_name.slice(0, 30)}...`
                    : task.task_name}
                </p>
                <p className="TaskMainSub">
                  {" "}
                  {(task.task_details ?? "").length > 40
                    ? `${task.task_details.slice(0, 40)}...`
                    : task.task_details}
                </p>
                <p className="TaskMainDate">
                  {new Date(task.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
