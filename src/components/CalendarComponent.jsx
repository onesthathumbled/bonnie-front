// CalendarComponent.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";

const CalendarComponent = ({ className, setDueDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDueDate(format(date, "yyyy-MM-dd HH:mm:ss.SSSSSS"));
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className={className}
      />
      {/* <p>Selected Date: {format(selectedDate, "yyyy-MM-dd HH:mm:ss.SSSS")}</p> */}
    </div>
  );
};

export default CalendarComponent;
