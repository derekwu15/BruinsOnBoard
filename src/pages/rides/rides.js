import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import { jwtDecode } from 'jwt-decode';
import { Container, EventContainer, EventAlignContainer, Title, Label, PopupLabel, PopupSubLabel, StyledSelect, DatePickerStyled, Button, EventPopupButton, ButtonsContainer, CenterContainer, TitleContainer } from './styledRides';
import { useNavigate } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const EventCalendar = () => {

  // popup for clicking on an event, need to add join ride, quantitty, to/from/when
  const [showEvent, setShowEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [member, setMember] = useState(null);
  const displayName = []
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEvent(true);
  };
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/rides');
      const data = await response.json();



      const formattedData = data.map(eventData => {
        const eventDate = moment(eventData.date + ' ' + eventData.time, 'MMMM DD, YYYY h:mm A').toDate();
        const eventDuration = 30 * 60 * 1000;
        return {
          id: eventData._id,
          title: `${eventData.from.toUpperCase()} TO ${eventData.to.toUpperCase()}`,
          start: eventDate,
          end: new Date(eventDate.getTime() + eventDuration),

          capacity: eventData.capacity,
          members: eventData.members,

        };
      });

      setEvents(formattedData);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const sendEmail = async (email, title, start, end, displayName) => {
    try {
      const response = await fetch('http://localhost:4000/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, title, start, end, displayName }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleJoin = async (event) => {

    const memb = event.members.push(member.user_id)

    const cap = event.capacity -= 1
    try {
      const userString = localStorage.getItem('user');
      const user = JSON.parse(userString);
      const token = user.token
      const response = await fetch('http://localhost:4000/api/members/' + member.user_id, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch profile data for ID: ' + member.user_id);
      }
      const memberData = await response.json();
      displayName.push(memberData.name);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }

    const memberEmails = [];
    try {
      const userString = localStorage.getItem('user');
      const user = JSON.parse(userString);
      const token = user.token

      for (const uid of event.members) {
        const response = await fetch('http://localhost:4000/api/profiles/' + uid, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch profile data for ID: ' + uid);
        }
        const memberData = await response.json();
        memberEmails.push(memberData.email);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }

    try {
      const response = await fetch("http://localhost:4000/api/rides/" + event.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ memb, cap })
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Ride Patched successfully");
      for (const email of memberEmails) {

        sendEmail(email, event.title, event.start, event.end, displayName)
      }
    } catch (error) {
      console.error("Invalid", error);
    }

    fetchData()

  }

  // stylized popup for ride information
  const EventsPopup = ({ event, onClose }) => (
    <EventContainer>
      <EventAlignContainer>
        <PopupLabel>{event.title}</PopupLabel>
        <PopupSubLabel>{moment(event.start).format('MMMM D, YYYY')}</PopupSubLabel>
        <PopupSubLabel>{moment(event.start).format('h:mm A')} - {moment(event.end).format('h:mm A')}</PopupSubLabel>
        <PopupSubLabel>capacity: {event.capacity} spots left</PopupSubLabel>
        <PopupSubLabel>members: {displayName.join(', ')}</PopupSubLabel>
        <ButtonsContainer>
          <EventPopupButton onClick={() => handleJoin(event)}>JOIN</EventPopupButton>
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

    const members = [];
    const capacity = 4;

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
      fetchData()
    } catch (error) {
      console.error("Invalid", error);
    }
  }

  const [events, setEvents] = useState([]);

 useEffect(() => {
  const fetchData = async () => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    if (!user) {
      console.error('JWT token not found in local storage');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/rides');
      const data = await response.json();

      const formattedData = data.map(eventData => {
        const eventDate = moment(eventData.date + ' ' + eventData.time, 'MMMM DD, YYYY h:mm A').toDate();
        const eventDuration = 30 * 60 * 1000;
        return {
          id: eventData._id,
          title: `${eventData.from.toUpperCase()} TO ${eventData.to.toUpperCase()}`,
          start: eventDate,
          end: new Date(eventDate.getTime() + eventDuration),
          capacity: eventData.capacity,
          members: eventData.members,
        };
      });

      setEvents(formattedData);
    } catch (error) {
      console.error('Error fetching events:', error);
    }

    const fetchMemberData = async () => {
      const user = userString ? JSON.parse(userString) : null;
      const token = user.token;
      if (token) {
        try {
          const userId = jwtDecode(token);
          const response = await fetch('http://localhost:4000/api/members/' + userId._id, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch member data');
          }

          const memberData = await response.json();
          setMember(memberData);
        } catch (error) {
          console.error('Error fetching member data:', error);
        }
      } else {
        console.error('JWT token not found in local storage');
      }
    };

    fetchMemberData();
  };

  fetchData();
}, [navigate]);

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
        {showEvent && (<EventsPopup event={selectedEvent} onClose={() => setShowEvent(false)} />)}
      </div>
    </div>
  );
};

export default EventCalendar;
