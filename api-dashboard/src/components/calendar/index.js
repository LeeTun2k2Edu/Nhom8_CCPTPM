import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./style.css";

export default function MiniCalendar(props) {
  const [value, onChange] = useState(new Date());
  return (
    <div className="calendar">
      <Calendar
        onChange={onChange}
        value={value}
        view={"month"}
      />
    </div>
  );
}