import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function MyDateTimePicker({ onSelect }) {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onSelect(date);
    };

    return (
        <div>
            <Calendar
                value={selectedDate}
                onChange={handleDateChange}
                showTimeSelect
                minDate={null}
                className="datetime-picker"
            />
        </div>
    );
}

export default MyDateTimePicker;
