import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333; /* Darken the title color for better readability */
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center items horizontally */
  width: 30%; /* Adjusted width for better spacing */
  margin-top: 1.5rem; /* Added top margin for separation from the title */
`;

const FormSection = styled.div`
  width: 100%; /* Utilize full width for each section */
  margin: 0.5rem 0;
  text-align: left; /* Align text to the left */
`;

const Label = styled.label`
  display: block; /* Ensure labels are on a new line */
  margin-bottom: 0.5rem;
  font-weight: bold; /* Make labels bold for emphasis */
  font-size: 1.2rem; /* Adjust the font size for labels */
`;

const StyledSelect = styled.select`
  width: 100%; /* Utilize full width for the select */
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.2rem; /* Adjust the font size for the select */
`;

const DatePickerStyled = styled(DatePicker)`
  width: 140%; /* Utilize full width for the date picker */
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.2rem; /* Adjust the font size for the date picker */
`;

const DateTimePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the left */
  width: 30%; /* Adjusted width for better spacing */
  margin-top: 1rem;
`;

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
  const currentDateTime = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDateTime);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Container>
      <Title>Need a Ride?</Title>

      {/* From and To dropdowns side by side */}
      <FormContainer>
        <FormSection>
          <Label htmlFor="fromLocation">From:</Label>
          <StyledSelect
            id="fromLocation"
            value={fromLocation}
            onChange={handleFromChange}
          >
            {locationOptions.map((option) => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </StyledSelect>
        </FormSection>

        <FormSection>
          <Label htmlFor="toLocation">To:</Label>
          <StyledSelect
            id="toLocation"
            value={toLocation}
            onChange={handleToChange}
          >
            {locationOptions.map((option) => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </StyledSelect>
        </FormSection>
      </FormContainer>

      {/* Date and Time Picker */}
      <DateTimePickerContainer>
        <Label htmlFor="datePicker">When:</Label>
        <DatePickerStyled
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat="Pp"
          minDate={currentDateTime}
        />
      </DateTimePickerContainer>
    </Container>
  );
};

export default Rides;
