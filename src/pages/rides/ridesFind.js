// Filename - pages/rides/ridesFind.js

import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';
import RidesCreate from './ridesCreate';

const GlobalStyle = createGlobalStyle`
    .rbc-toolbar-label {
        font-family: 'Raleway';
        text-align: center;
        flex: 1;
    }
    .rbc-toolbar button {
        font-family: 'Raleway';
    }
    .rbc-calendar {
        font-family: 'Raleway';
    }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 2rem;
`;

const CalendarContainer = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 2rem;
`;

const EventContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 55vw;
    max-width: 700px;
    max-height: 90%;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: -1rem;
  margin-top: 0rem;
  font-family: 'Playfair Display';
`;

const Label = styled.label`
    display: block;
    margin-top: 0rem;
    margin-bottom: 0.25rem;
    color: #262626;
    font-weight: bold;
    font-size: 2.5rem;
    font-family: 'Raleway';
`;

const SubLabel = styled.label`
    display: block;
    margin-top: 0rem;
    margin-bottom: 0.25rem;
    color: #262626;
    font-size: 1.5rem;
    font-family: 'Raleway';
`;

const Button = styled.button`
    background-color: #36454F;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 10px;
    font-size: 0.75rem;
    font-family: 'Raleway';
    transition: background-color 0.3s;

    &:hover {
        background-color: #2c3e50;
    }
`;

const ToolbarSection = styled.span`
    font-family: 'Raleway';
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ToolbarLeftSection = styled.span`
    font-family: 'Raleway';
    display: flex;
    justify-content: start;
    align-items: center;
    flex: 1;
`;

const ToolbarRightSection = styled.span`
    font-family: 'Raleway';
    display: flex;
    justify-content: end;
    align-items: center;
    flex: 1;
`;
const localizer = momentLocalizer(moment);

const CustomToolbar = ({ label, onNavigate, showCreatePopup, togglePopup }) => (
    <div className="rbc-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ToolbarLeftSection>
            <Button onClick={() => onNavigate('PREV')}>PREV</Button>
            <Button onClick={() => onNavigate('TODAY')}>TODAY</Button>
            <Button onClick={() => onNavigate('NEXT')}>NEXT</Button>
        </ToolbarLeftSection>
        <ToolbarSection>
            <span>{label}</span>
        </ToolbarSection>
        <ToolbarRightSection>
            <Button onClick={togglePopup}>CREATE</Button>
        </ToolbarRightSection>
    </div>
);

const RidesFind = () => {
    const [showCreatePopup, setShowCreatePopup] = useState(false);
    const [events, setEvents] = useState([])
    const [selectedEvent, setSelectedEvent] = useState(null);
    const togglePopup = () => setShowCreatePopup(!showCreatePopup);
    const handleAddEvent = (newEvent) => {
        setEvents([...events, newEvent]);
    }
    const handleEventSelect = (event) => {
        setSelectedEvent(event);
    };

    const handleClick = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:4000/api/rides/", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            //   body: JSON.stringify({ to, from, date, time, capacity, members }),
            });
      
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
      
            console.log("Got rides successfully");
            // Redirect or show success message as needed
          } catch (error) {
            this.setState({ error: "failed to get rides" });
            console.error("Invalid GET", error);
          }

    }

    return (
        <div>
            <div>
                <Button onClick = {handleClick}>refresh</Button>
            </div>
            <GlobalStyle />
            <Container>
                <Title>RIDES</Title>
            </Container>
            <CalendarContainer>
                <Calendar
                    localizer={localizer}
                    events={events}
                    onSelectEvent={handleEventSelect}
                    views={['week']}
                    defaultView='week'
                    step={30}
                    timeslots={1}
                    style={{ height: 500 }}
                    components={{
                        toolbar: (props) => <CustomToolbar {...props} showCreatePopup={showCreatePopup} togglePopup={togglePopup} />
                    }}
                />
            </CalendarContainer>
            {selectedEvent && (
            <EventContainer>
                <Button onClick={() => setSelectedEvent(null)}>X</Button>
                <Container>
                    <Label>{selectedEvent.title}</Label>
                    <SubLabel>{moment(selectedEvent.start).format('MMMM D, YYYY')}</SubLabel>
                    <SubLabel>{moment(selectedEvent.start).format('h:mm A')} TO {moment(selectedEvent.end).format('h:mm A')}</SubLabel>
                </Container>
            </EventContainer>
        )}
            <RidesCreate isOpen={showCreatePopup} onClose={togglePopup} onAddEvent={handleAddEvent} />
        </div>
    );
};

export default RidesFind;