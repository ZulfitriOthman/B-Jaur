import { useState } from "react";
import "./TimePicker.css";

function TimePicker() {
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [ampm, setAmpm] = useState("AM");

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i < 10 ? `0${i}` : i.toString()
  );
  const ampmOptions = ["AM", "PM"];

  return (
    <div className="time-picker">
      <div className="time-dropdown">
        <select
          value={hour}
          onChange={(e) => setHour(e.target.value)}
          className="time-select"
        >
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>

        <select
          value={minute}
          onChange={(e) => setMinute(e.target.value)}
          className="time-select"
        >
          {minutes.map((minute) => (
            <option key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </select>

        <select
          value={ampm}
          onChange={(e) => setAmpm(e.target.value)}
          className="time-select"
        >
          {ampmOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <p>
        Selected Time: {hour}:{minute} {ampm}
      </p>
    </div>
  );
}

export default TimePicker;
