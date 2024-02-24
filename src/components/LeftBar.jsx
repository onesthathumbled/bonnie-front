import React from "react";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import PieChartRoundedIcon from "@mui/icons-material/PieChartRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";

const LeftBar = () => {
  return (
    <div className="LeftBar">
      <div className="TButton">
        <button>T</button>
      </div>

      <div className="Left-Icons">
        <GridViewRoundedIcon />
        <PieChartRoundedIcon />
        <FolderRoundedIcon />
        <AccessTimeFilledRoundedIcon />
        <CalendarMonthRoundedIcon />
        <GroupRoundedIcon />
      </div>
    </div>
  );
};

export default LeftBar;
