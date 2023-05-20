import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function MyDateTimePicker({ onSelect }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onSelect(date);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <div>
      <Calendar
        value={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        minDate={null}
      />
      {selectedDate && (
        <p>Selected Date: {formatDate(selectedDate)}</p>
      )}
    </div>
  );
}

export default MyDateTimePicker;
