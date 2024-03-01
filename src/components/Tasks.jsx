import React from "react";
import { useParams } from "react-router-dom";

const Tasks = () => {
  const { category_id } = useParams();

  return <div>Tasks Component for Category ID: {category_id}</div>;
};

export default Tasks;
