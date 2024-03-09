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

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: -1rem;
  margin-top: 0rem;
  font-family: 'Playfair Display';
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
    const togglePopup = () => setShowCreatePopup(!showCreatePopup);
    
    return (
        <div>
            <GlobalStyle />
            <Container>
                <Title>RIDES</Title>
            </Container>
            <CalendarContainer>
                <Calendar
                    localizer={localizer}
                    views={['week']}
                    defaultView='week'
                    step={30}
                    timeslots={2}
                    style={{ height: 500 }}
                    components={{
                        toolbar: (props) => <CustomToolbar {...props} showCreatePopup={showCreatePopup} togglePopup={togglePopup} />
                    }}
                />
            </CalendarContainer>
            <RidesCreate isOpen={showCreatePopup} onClose={togglePopup} />
        </div>
    );
};

export default RidesFind;
