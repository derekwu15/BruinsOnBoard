import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
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
    z-index: 1000;
`;

const EventAlignContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 2rem;
`;

const Title = styled.h1`
    font-size: 3.2rem;
    margin-bottom: 0.6rem;
    margin-top: 0rem;
    font-family: 'Playfair Display';
    letter-spacing: -1px;
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

const PopupLabel = styled.label`
    display: block;
    margin-top: 0rem;
    margin-bottom: 0.25rem;
    color: #262626;
    font-weight: bold;
    font-size: 2.5rem;
    font-family: 'Raleway';
`;

const PopupSubLabel = styled.label`
    display: block;
    margin-top: 0rem;
    margin-bottom: 0.25rem;
    color: #262626;
    font-size: 1.5rem;
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
    width: 275px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #2c3e50;
    }
`;

const EventPopupButton = styled.button`
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

const CenterContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 5rem;
`;

const localizer = momentLocalizer(moment);

const EventCalendar = () => {

  // popup for clicking on an event, need to add join ride, quantitty, to/from/when
  const [showEvent, setShowEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); 

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEvent(true);
  };

  // stylized popup for ride information
  const EventsPopup = ({ event, onClose }) => (
  <EventContainer>
    <EventAlignContainer>
      <PopupLabel>{event.title}</PopupLabel>
      <PopupSubLabel>{moment(event.start).format('MMMM D, YYYY')}</PopupSubLabel>
      <PopupSubLabel>{moment(event.start).format('h:mm A')} - {moment(event.end).format('h:mm A')}</PopupSubLabel>
      <PopupSubLabel>capacity: {event.capacity}</PopupSubLabel>
      <PopupSubLabel>members: {event.members.join(', ')}</PopupSubLabel>
      <ButtonsContainer>
        <EventPopupButton>JOIN</EventPopupButton>
        <EventPopupButton onClick={onClose}>CLOSE</EventPopupButton>
      </ButtonsContainer>
    </EventAlignContainer>
  </EventContainer>
);

  // logic for changing to and from
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

  // set current day and time to min selection
  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const minTime = isToday ? new Date() : new Date().setHours(0, 0, 0, 0);

  // create -> sends data to backend -> calendar takes data from back and displays event
  const handleCreate = async (e) => {
    e.preventDefault();

    const to = toLocation;
    const from = fromLocation;
    const date = moment(selectedDate).format('MMMM D, YYYY');
    const time = moment(selectedDate.getTime()).format('h:mm A');
    
    const members = ["test1", "test2"];
    const capacity = members.length;

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
            title: `${eventData.from.toUpperCase()} TO ${eventData.to.toUpperCase()}`,
            start: eventDate,
            end: new Date(eventDate.getTime() + eventDuration),

            capacity: eventData.capacity,
            members: eventData.members,

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
      <div style={{ flex: '1.5', paddingTop: '20px', paddingLeft: '20px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          onSelectEvent={event => handleEventClick(event)}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          defaultView="month"
        />
      </div>
      <div style={{ flex: '1', backgroundColor: 'white' }}>
        <TitleContainer>
          <Title>CREATE A RIDE</Title>
        </TitleContainer>
        <CenterContainer>
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
        </CenterContainer>
        <ButtonsContainer>
          <Button onClick={handleCreate}>CREATE</Button> 
        </ButtonsContainer>
        {showEvent && (<EventsPopup event={selectedEvent} onClose={() => setShowEvent(false)} /> )}
        </div>
    </div>
  );
};

export default EventCalendar;
