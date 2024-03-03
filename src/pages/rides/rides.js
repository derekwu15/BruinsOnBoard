// Filename - pages/rides/rides.js
import React, { useState } from "react";

const Rides = () => {
  const [fromLocation, setFromLocation] = useState("lax");
  const [toLocation, setToLocation] = useState("ucla");

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

  const locationOptions = ["ucla", "lax"].sort();

  return (
    <div>
      <h1>Need a Ride?</h1>

      {/* "From" dropdown */}
      <label htmlFor="fromLocation">From:</label>
      <select id="fromLocation" value={fromLocation} onChange={handleFromChange}>
        {locationOptions.map((option) => (
          <option key={option} value={option}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>

      {/* "To" dropdown */}
      <label htmlFor="toLocation">To:</label>
      <select id="toLocation" value={toLocation} onChange={handleToChange}>
        {locationOptions.map((option) => (
          <option key={option} value={option}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Add other content as needed */}
    </div>
  );
};

export default Rides;
