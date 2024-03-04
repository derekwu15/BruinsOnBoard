// Filename - pages/profile/rides.js

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 2rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 0.1rem;
  margin-top: 0rem;
  font-family: 'GT America Mono', monospace;
  letter-spacing: -4px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  margin-top: 0.75rem;
`;

const FormSection = styled.div`
  width: 100%;
  margin-top: 0.25rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
  text-align: left;
`;

const Label = styled.label`
  display: flex;
  margin-bottom: 0.25rem;
  color: #262626;
  font-weight: bold;
  font-size: 1.2rem;
  font-family: 'GT America Mono', monospace;
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
  font-family: 'GT America Mono', monospace;
`;

const DatePickerStyled = styled(DatePicker)`
  width: 145%; 
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  color: #333;
  font-size: 1.2rem;
  font-family: 'GT America Mono', monospace;
  text-transform: uppercase;
`;

const DateTimePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 30%;
  margin-top: 0.25rem;
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
  font-family: 'GT America Mono', monospace;
  width: 175px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.25rem;
`;

const Rides = () => {
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

  return (
    <Container>
      <Title>NEED A RIDE?</Title>
      <FormContainer>
        <FormSection>
          <Label htmlFor="fromLocation">FROM:</Label>
          <StyledSelect id="fromLocation" value={fromLocation} onChange={handleFromChange}>
            {locationOptions.map((option) => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </StyledSelect>
        </FormSection>
        <FormSection>
          <Label htmlFor="toLocation">TO:</Label>
          <StyledSelect id="toLocation" value={toLocation} onChange={handleToChange}>
            {locationOptions.map((option) => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </StyledSelect>
        </FormSection>
      </FormContainer>
      <DateTimePickerContainer>
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
      </DateTimePickerContainer>
      <FormContainer>
        <ButtonsContainer>
          <Link to="/ridesFind"><Button>FIND</Button></Link>
          <Link to="/ridesCreate"><Button>CREATE</Button></Link>
        </ButtonsContainer>
      </FormContainer>
    </Container>
  );
};

export default Rides;
