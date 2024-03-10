// Filename - pages/rides/ridesCreate.js

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
`;

const PopupContainer = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 55vw;
    max-width: 700px;
    max-height: 90%;
`;

const Title = styled.h1`
    font-size: 3.2rem;
    margin-bottom: 0.6rem;
    margin-top: 0rem;
    font-family: 'Playfair Display';
    letter-spacing: -0.5px;
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

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 0.25rem;
`;

const RidesCreate = ({ isOpen, onClose, onAddEvent }) => {
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

        const newEvent = {
            title: `${fromLocation.toUpperCase()} TO ${toLocation.toUpperCase()}`,
            start: selectedDate,
            end: new Date(selectedDate.getTime() + 30 * 60 * 1000),
        };
        onAddEvent(newEvent);

        // const { name, email, password } = this.state;
        const to = toLocation.toUpperCase();
        const from = fromLocation.toUpperCase();
        const date = moment(selectedDate).format('MMMM D, YYYY'); // Ensure selectedDate is already defined in your component's state
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
          this.setState({ error: "Failed to create ride" });
          console.error("Invalid", error);
        }


        onClose();
    }

  if (!isOpen) return null;

  return (
    <PopupContainer>
        <Title>CREATE A RIDE</Title>
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
            <Label htmlFor="datePicker">WHEN:</Label>
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
        </Container>
        <ButtonsContainer>
            <Button onClick={handleCreate}>CREATE</Button>
            <Button onClick={onClose}>CLOSE</Button>
        </ButtonsContainer>
    </PopupContainer>
  );
};

export default RidesCreate;