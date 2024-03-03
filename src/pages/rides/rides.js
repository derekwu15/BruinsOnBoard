// Filename - pages/rides/rides.js
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";

const Rides = () => {

  // to and from buttons

  const [fromLocation, setFromLocation] = useState("lax");
  const [toLocation, setToLocation] = useState("ucla");
  // for from dropdown, handles options
  const handleFromChange = (e) => {
    const selectedFromLocation = e.target.value;
    setFromLocation(selectedFromLocation);
    setToLocation(selectedFromLocation === "ucla" ? "lax" : "ucla");
  };
  // for to dropdown, handles options
  const handleToChange = (e) => {
    const selectedToLocation = e.target.value;
    setToLocation(selectedToLocation);
    setFromLocation(selectedToLocation === "ucla" ? "lax" : "ucla");
  };

  const locationOptions = ["ucla", "lax"].sort();

  // date and time picker button
  const currentDateTime = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDateTime);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h1>Need a Ride?</h1>

      {/* from dropdown */}
      <label htmlFor="fromLocation">From:</label>
      <select id="fromLocation" value={fromLocation} onChange={handleFromChange}>
        {locationOptions.map((option) => (
          <option key={option} value={option}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>

      {/* to dropdown */}
      <label htmlFor="toLocation">To:</label>
      <select id="toLocation" value={toLocation} onChange={handleToChange}>
        {locationOptions.map((option) => (
          <option key={option} value={option}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Date and Time Picker */}
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat="Pp"
          minDate={currentDateTime}
        />
      </div>
    </div>
  );
};

export default Rides;
