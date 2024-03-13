import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import { jwtDecode } from 'jwt-decode';
import { Container, EventContainer, EventAlignContainer, MemberLink, Title, Label, PopupLabel, PopupSubLabel, StyledSelect, DatePickerStyled, Button, EventPopupButton, ButtonsContainer, CenterContainer, TitleContainer } from './styledRides';
import { useNavigate } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const EventCalendar = () => {

  // popup for clicking on an event, need to add join ride, quantitty, to/from/when
  const [showEvent, setShowEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [member, setMember] = useState(null);
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEvent(true);
  };

  const navigate = useNavigate();

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
      console.log("data formatted")
    } catch (error) {
      console.error('Error fetching events:', error);
    }

    // Delete rides from yesterday and beyond
    const yesterday = moment().subtract(1, 'days').endOf('day'); // get yesterday's date and set time to end of day
    const ridesToDelete = events.filter(event => moment(event.start).isBefore(yesterday));

    await Promise.all(ridesToDelete.map(async (event) => {
      try {
        const response = await fetch(`http://localhost:4000/api/rides/${event.id}`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error('Failed to delete ride');
        console.log(`Ride with id ${event.id} deleted successfully`);
      } catch (error) {
        console.error(`Error deleting ride with id ${event.id}:`, error);
      }
    }));

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

          if (!memberData.username) {
            navigate('/profile');
          }

        } catch (error) {
          console.error('Error fetching member data:', error);
        }
      } else {
        console.error('JWT token not found in local storage');
      }
    };
    fetchMemberData();
  }

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

  const fetchEmail = async (userId) => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const token = user.token;
    try {
        const response = await fetch(`http://localhost:4000/api/profiles/${userId}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch email for user');
        }
        const userData = await response.json();
        return userData.email;
    } catch (error) {
        console.error('Error fetching email:', error);
        return null;
    }
  };

  const handleJoin = async (event) => {
    if (selectedEvent && selectedEvent.capacity >= 1 && !selectedEvent.members.includes(`${member.username}:${member.user_id}`)) {
      try {
        const newMember = `${member.username}:${member.user_id}`;
        const updatedCapacity = selectedEvent.capacity - 1;
        const updatedMembers = [...selectedEvent.members, newMember];

        const response = await fetch(`http://localhost:4000/api/rides/${selectedEvent.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            capacity: updatedCapacity,
            members: updatedMembers,
          }),
        });

        if (!response.ok) throw new Error("Network response was not ok");

        // Update the selected event with new capacity and members
        const updatedSelectedEvent = {
          ...selectedEvent,
          capacity: updatedCapacity,
          members: updatedMembers,
        };

        setSelectedEvent(updatedSelectedEvent);

        // Update the events array to reflect change
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === selectedEvent.id ? updatedSelectedEvent : event
          )
        );

        console.log("Ride joined successfully");
        // Extract usernames from each member string
        const usernames = selectedEvent.members.map(memberString => {
          const [username] = memberString.split(':');
          return username;
        });
        usernames.push(member.username);
        selectedEvent.members.forEach(async memberString => {
          // Extract username and user ID from the member string
          const [username, userId] = memberString.split(':');
          // Fetch the email for the user ID
          const email = await fetchEmail(userId);
      
          // Call sendEmail if email is retrieved successfully
          if (email) {
              sendEmail(email, selectedEvent.title, selectedEvent.start, selectedEvent.end, usernames);
          } else {
              console.error(`Failed to fetch email for user ${username}`);
          }
        });
        const currentEmail = await fetchEmail(member.user_id);
        sendEmail(currentEmail, selectedEvent.title, selectedEvent.start, selectedEvent.end, usernames);      

      } catch (error) {
        console.error("Error joining the ride:", error);
      }
    } else {
      console.log("Ride is at full capacity or selected event is not defined.");
    }
  }

  const handleLeave = async (event) => {
    const memberString = `${member.username}:${member.user_id}`;

    if (selectedEvent && selectedEvent.members.includes(memberString)) {
      try {
        // Increase capacity by 1
        const updatedCapacity = selectedEvent.capacity + 1;

        // Remove the specific member from the members array
        const updatedMembers = selectedEvent.members.filter(m => m !== memberString);

        const response = await fetch(`http://localhost:4000/api/rides/${selectedEvent.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            capacity: updatedCapacity,
            members: updatedMembers,
          }),
        });

        if (!response.ok) throw new Error("Network response was not ok");

        // Update the selected event with the new capacity and members
        const updatedSelectedEvent = {
          ...selectedEvent,
          capacity: updatedCapacity,
          members: updatedMembers,
        };

        // Update the selected event in the state
        setSelectedEvent(updatedSelectedEvent);

        // Update the events array in the state to reflect change
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === selectedEvent.id ? updatedSelectedEvent : event
          )
        );

        console.log("Successfully left the ride");

      } catch (error) {
        console.error("Error leaving the ride:", error);
      }
    } else {
      console.log("Member is not part of this ride or selected event is not defined.");
    }

  };

  // stylized popup for ride information
  const EventsPopup = ({ event, onClose }) => (
    <EventContainer>
      <EventAlignContainer>
        <PopupLabel>{event.title}</PopupLabel>
        <PopupSubLabel>{moment(event.start).format('MMMM D, YYYY')}</PopupSubLabel>
        <PopupSubLabel>{moment(event.start).format('h:mm A')} - {moment(event.end).format('h:mm A')}</PopupSubLabel>
        <PopupSubLabel>capacity: {event.capacity} spot(s) left</PopupSubLabel>
        <PopupSubLabel>
          members:{' '}
          {event.members.map((member, index) => {
            const [username, userId] = member.split(':');
            return (
              <React.Fragment key={userId}>
                <MemberLink to={`/viewprofile/${userId}`}>{username}</MemberLink>
                {index !== event.members.length - 1 ? ', ' : ''}
              </React.Fragment>
            );
          })}
        </PopupSubLabel>
        <ButtonsContainer>
          <EventPopupButton onClick={() => handleJoin(event)}>JOIN</EventPopupButton>
          <EventPopupButton onClick={() => handleLeave(event)}>LEAVE</EventPopupButton>
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
  const [newRideId, setNewRideId] = useState(null);

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

         // Parse the JSON response body
      const createdRideData = await response.json();
      // setNewRideId(createdRideData._id); // Save the ID of the newly created ride
      // // Assuming 'fetchData' asynchronously fetches and formats all rides, including the newly created one
      await fetchData();

      // Find the newly created ride in the list of all formatted rides by its ID
      // console.log("Here is the createdRideData._id", createdRideData._id)
      // console.log("Here is the formatted ID for all rides", events )
      // const selectedRide = events.find(event => event.id === createdRideData._id);
      // console.log(selectedRide)

      // if (selectedRide) {
      //   setSelectedEvent(selectedRide); // Set the found ride as the selected event
      //   console.log("Ride created and selected successfully", selectedRide);
      //   handleJoin(selectedRide); // Assuming you want to handle join for the selected ride
      // } else {
      //   console.log("Newly created ride not found in the fetched data");
      // }
    } catch (error) {
      console.error("Failed to create or select the ride", error);
    }

    console.log("Ride created successfully");
      // handleJoin(e);
    // } catch (error) {
    //   console.error("Invalid", error);
    // }
  }

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();


    const interval = setInterval(() => {
      fetchData();
    }, 10000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
