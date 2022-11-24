import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";

const CalendarPage = () => {
  const [value, setValue] = useState(new Date());

  const data = new Date(value.getFullYear(), value.getMonth(), value.getDate(), 23, 59, 0, 0);
  return (
    <>
      <div>
        <div class="h1">{data.toLocaleString("ko")}</div>
        <Calendar locale="kor" returnValue="start" onChange={setValue} value={value} />
      </div>
    </>
  );
};

export default CalendarPage;
