// Filename - pages/rides/ridesTest.js

import React, { useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";


const Button = styled.button`
    background-color: #36454F;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 10px;
    font-size: 1.2rem;
    font-family: 'Raleway';
    width: 175px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #2c3e50;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
`;

const Label = styled.label`
    display: block;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    color: #262626;
    font-weight: bold;
    font-size: 1.2rem;
    font-family: 'Raleway';
`;

const StyledSelect = styled.select`
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    color: #333;
    font-size: 1.2rem;
    font-family: 'Raleway';
`;

const DatePickerStyled = styled(DatePicker)`
    width: 95%; 
    padding: 0.5rem;
    margin: 0.5rem 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    color: #333;
    font-size: 1.2rem;
    font-family: 'Raleway';
    text-transform: uppercase;
`;

const RidesTest = () => {
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

    return(
      <Container>
        <Label htmlFor="fromLocation">FROM:</Label>
            <StyledSelect id="fromLocation" value={fromLocation} onChange={handleFromChange}>
                {locationOptions.map((option) => (
                <option key={option} value={option}>
                    {option.toUpperCase()}
                </option>
                ))}
            </StyledSelect>  
            <Label htmlFor="toLocation">TO:</Label>
            <StyledSelect id="toLocation" value={toLocation} onChange={handleToChange}>
                {locationOptions.map((option) => (
                <option key={option} value={option}>
                    {option.toUpperCase()}
                </option>
                ))}
            </StyledSelect>
            <DatePickerStyled
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
            <Button onClick={handleCreate}>CREATE</Button>
      </Container>
          
    );

};

export default RidesTest;