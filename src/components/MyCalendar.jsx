import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [value, setValue] = useState(new Date());


  const handleSelectedDate = () => {

  }

  return (
    <div>
      <Calendar onChange={setValue} value={value} />
    </div>
  );
};

export default MyCalendar;
