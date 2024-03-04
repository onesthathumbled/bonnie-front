import React from "react";
import { startOfDay, endOfDay, isWithinInterval } from "date-fns";
import { useSelector } from "react-redux";
import "../styles/TodayContainer.css";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

const TodayTasks = () => {
  const { all_tasks } = useSelector((state) => state.tasks);
  const tasksToday = all_tasks.filter((task) => {
    const taskDueDate = new Date(task.due_date); // Convert due_date string to Date object

    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    return isWithinInterval(taskDueDate, { start: todayStart, end: todayEnd });
  });

  const getPriorityColor = (priority) => {
    if (typeof priority === "string") {
      switch (priority.toLowerCase()?.charAt(0)) {
        case "h":
          return "#ff7575"; // High
        case "m":
          return "#ffa34f"; // Medium
        case "l":
          return "#43b97f"; // Low
        default:
          return "transparent";
      }
    } else if (typeof priority === "number") {
      switch (priority) {
        case 2:
          return "#ff7575"; // High
        case 1:
          return "#ffa34f"; // Medium
        case 0:
          return "#43b97f"; // Low
        default:
          return "transparent";
      }
    }

    return "transparent"; // Default color if priority is not a string or number
  };

  return (
    <div className="TodayContainer">
      <div className="AMTtitle TCp">Tasks Today</div>
      <div className="CFlex TCFlex">
        {tasksToday.length < 1 && (
          //   <Link to={"/categories"}>
          <div
            className="CLi middleClass"
            //    onClick={handleAddWindow}
          >
            <p>There's nothing here.</p>
            {/* <AddRoundedIcon className="midCic" fontSize="large" /> */}
            {/* <p>Add a category first.</p> */}
          </div>
          //   </Link>
        )}
        {tasksToday &&
          tasksToday.map((task) => (
            <div
              className="TCLi Whiter TCwhiter"
              key={task.id}
              //   onContextMenu={(e) => handleContextMenu(e, task)}
              //   onClick={handleClose}
              // style={{
              //   backgroundColor:
              //     task.completion_status === "completed"
              //       ? "#c280d2"
              //       : "#1f2029",
              // }}
            >
              <div className="Tstatus">
                <p
                  className="TaskStat"
                  style={{
                    backgroundColor: getPriorityColor(task?.priority),
                  }}
                >
                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}
                </p>
                <MoreHorizRoundedIcon className="TaskMainIcs" />
              </div>
              {/* <Link to={`/categories/${category.id}/tasks/${task.id}`}> */}
              <div className="TShead">
                <p
                  className="TStitle"
                  // style={{
                  //   textDecoration:
                  //     task.completion_status === "completed"
                  //       ? "line-through"
                  //       : task.completion_status === "in_progress"
                  //       ? "underline"
                  //       : "none",
                  // }}
                >
                  {(task.task_name ?? "").length > 30
                    ? `${task.task_name.slice(0, 30)}...`
                    : task.task_name}
                </p>
                <p
                  className="TSdetails"
                  // style={{
                  //   textDecoration:
                  //     task.completion_status === "completed"
                  //       ? "line-through"
                  //       : "none",
                  // }}
                >
                  {(task.task_details ?? "").length > 40
                    ? `${task.task_details.slice(0, 40)}...`
                    : task.task_details}
                </p>
              </div>
              {/* </Link> */}
              <div className="CTgory">
                <p
                  className="CTstatus"
                  style={{
                    color:
                      task.completion_status === "completed"
                        ? "#43b97f"
                        : task.completion_status === "in_progress"
                        ? "#c280d2"
                        : "#ffa34f",
                  }}
                >
                  {task.completion_status === "backlog"
                    ? "Backlog"
                    : task.completion_status === "in_progress"
                    ? "In Progress"
                    : "Completed"}
                </p>
                <p className="TaskMainDate">
                  {" "}
                  {new Date(task.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TodayTasks;
