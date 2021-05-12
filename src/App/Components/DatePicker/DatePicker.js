import React, { useState } from "react";
import { DatePicker, message, Alert } from "antd";

const DatePickers = () => {
  const [date, setDate] = useState(null);
  const handleChange = (value) => {
    message.info(
      `Selected Date: ${value ? value.format("YYYY-MM-DD") : "None"}`
    );
    setDate(value);
  };
  return (
    <div>
      <div className="datePickerManual">
        <h1>Date Picker</h1>
        <DatePicker onChange={handleChange} />
        <div style={{ marginTop: 16 }}>
          {/* Selected Date: {date ? date.format("YYYY-MM-DD") : "None"} */}
          <Alert
            message="Selected Date"
            description={date ? date.format("YYYY-MM-DD") : "None"}
          />
        </div>
      </div>
    </div>
  );
};

export default DatePickers;
