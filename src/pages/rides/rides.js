import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const localizer = momentLocalizer(moment);

const EventCalendar = () => {

  const [fromLocation, setFromLocation] = useState("lax");
  const [toLocation, setToLocation] = useState("ucla");
  const locationOptions = ["ucla", "lax"].sort();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleFromChange = (e) => {
    const selectedFromLocation = e.target.value;
    setFromLocation(selectedFromLocation);
    setToLocation(selectedFromLocation === "ucla" ? "lax" : "ucla");
  };

  const handleToChange = (e) => {
    const selectedToLocation = e.target.value;
    setToLocation(selectedToLocation);
    setFromLocation(selectedToLocation === "ucla" ? "lax" : "ucla");
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const isToday = selectedDate.toDateString() === new Date().toDateString();

  const minTime = isToday ? new Date() : new Date().setHours(0, 0, 0, 0);

  const handleCreate = async (e) => {
    e.preventDefault();

    const to = toLocation;
    const from = fromLocation;
    const date = moment(selectedDate).format('MMMM D, YYYY');
    const time = moment(selectedDate.getTime()).format('h:mm A');
    const capacity = 1;
    const members = ["test"];

    try {
      const response = await fetch("http://localhost:4000/api/rides/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, from, date, time, capacity, members })
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Ride created successfully");
      // Redirect or show success message as needed
    } catch (error) {
      //this.setState({ error: "Failed to create ride" });
      console.error("Invalid", error);
    }
  }

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/rides');
        const data = await response.json();

        const formattedData = data.map(eventData => {
          const eventDate = moment(eventData.date + ' ' + eventData.time, 'MMMM DD, YYYY h:mm A').toDate();
          const eventDuration = 30 * 60 * 1000; // 30 minutes in milliseconds

          return {
            id: eventData._id,
            title: `${eventData.from} to ${eventData.to}`,
            start: eventDate,
            end: new Date(eventDate.getTime() + eventDuration),
          };
        });

        console.log('Formatted Data:', formattedData); // Log the formatted data
        setEvents(formattedData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 10000);
    
  }, []);

  return (
    <div style={{ display: 'flex', height: 600 }}>
      <div style={{ flex: '1', paddingRight: '20px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          defaultView="month"
        />
      </div>
      <div style={{ flex: '1', backgroundColor: 'lightgray' }}>
        <label htmlFor="fromLocation">FROM:</label>
        <select id="fromLocation" value={fromLocation} onChange={handleFromChange}>
          {locationOptions.map((option) => (
            <option key={option} value={option}>
              {option.toUpperCase()}
            </option>
          ))}
        </select>
        <label htmlFor="toLocation">TO:</label>
        <select id="toLocation" value={toLocation} onChange={handleToChange}>
          {locationOptions.map((option) => (
            <option key={option} value={option}>
              {option.toUpperCase()}
            </option>
          ))}
        </select>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          timeFormat="h:mm aa"
          timeIntervals={30}
          timeCaption="Time"
          minDate={new Date()}
          minTime={new Date(minTime)}
          maxTime={new Date().setHours(23, 30)}
        />
        <button onClick={handleCreate}>CREATE</button>      </div>
    </div>
  );
};

export default EventCalendar;
