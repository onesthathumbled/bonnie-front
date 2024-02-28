import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Category.css";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../features/categories/categorySlice";
import { getTasks } from "../features/tasks/taskSlice";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const Category = () => {
  const { category_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { category } = useSelector((state) => state.categories);

  const { category_name, category_details, created_at } = category;

  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getCategory(category_id));

    dispatch(getTasks());
  }, [dispatch]);

  return (
    <div className="SContainer">
      <div className="SCategory">
        <button className="SBack" onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon />
        </button>
        <div className="SBlock">
          <p className="STitle">{category_name} </p>

          <p className="SId">Category ID: {category_id}</p>
          <p className="SDetails">{category_details}</p>
          <p className="SDate">{new Date(created_at).toLocaleDateString()}</p>
        </div>
      </div>

      <div>
        {tasks &&
          tasks.map((task) => (
            <div>
              <p>{task.task_name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Category;
