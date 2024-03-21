"use client";
import React, { useState, useEffect } from "react";
import Calendar_Head from "./Calendar-Head/Calendar-Head";
import Day from "./Day/Day";
import styles from "./Calendar.module.css";
import Event_Create from "./Event-create/Event-Create";
import Event_Edit from "./Event-edit/Event-Edit";
import Events_of_Day from "./Events-of-Day/Events-of-Day";

const Calendar = () => {
  //monthOffset is the current month we are on.
  //The offset allows us to skip through the other month in relation to current month
  const [monthOffset, setMonthOffest] = useState(0);
  const [days, setDays] = useState([]);
  const [dateDisplay, setDateDisplay] = useState("");
  const [clicked, setClicked] = useState();
  const [events, setEvents] = useState(
    typeof window !== "undefined" &&
      localStorage &&
      localStorage.getItem("events")
      ? JSON.parse(localStorage.getItem("events"))
      : []
  );

  const eventForDate = (date) => events.filter((e) => e.date === date);

  //should events change, we write the changes in the local storage
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    const weekdays = [
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
      "Samstag",
      "Sonntag",
    ];

    const dt = new Date();

    if (monthOffset !== 0) {
      dt.setMonth(new Date().getMonth() + monthOffset);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    //first Weekday
    const firstDayOfMonth = new Date(year, month, 1);
    //Number of Days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    //creates a String in Format Freitag 1.3.2024
    const dateString = firstDayOfMonth.toLocaleDateString("de", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    setDateDisplay(`${dt.toLocaleDateString("de", { month: "long" })} ${year}`);

    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

    const daysArr = [];

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const dayString = `${month + 1} / ${i - paddingDays} / ${year}`;

      if (i <= paddingDays) {
        daysArr.push({
          value: "padding",
          event: null,
          isCurrentDay: false,
          date: "",
        });
      } else {
        daysArr.push({
          value: i - paddingDays,
          event: eventForDate(dayString),
          isCurrentDay: i - paddingDays === day && monthOffset === 0,
          date: dayString,
        });
      }
    }

    setDays(daysArr);
  }, [events, monthOffset]);

  /*
  const [style, setStyle] = useState(`${styles.calendar}`) 
  useEffect( () => {
    setStyle(`${styles.calendar} + ${clicked} ? ${styles.transparent} : ""`);
  },[clicked])

  console.log(style)
  */

  const [createNewEvent, setCreateNewEvent] = useState(false);
  const [editEvent, setEditEvent] = useState();
  const [id, setId] = useState(1);
  return (
    <>
      <div className={styles.calendar}>
        <div className={styles.head}>
          <Calendar_Head
            dateDisplay={dateDisplay}
            onNext={() => setMonthOffest(monthOffset + 1)}
            onBack={() => setMonthOffest(monthOffset - 1)}
          />
        </div>

        <div className={styles.days}>
          {days.map((d, index) => (
            <Day
              key={index}
              day={d}
              onClick={() => {
                if (d.value !== "padding") {
                  setClicked(d.date);
                }
              }}
            />
          ))}
        </div>
      </div>

      {clicked && (
        <Events_of_Day
          date={clicked}
          events={eventForDate(clicked)}
          onClose={() => setClicked(false)}
          onNew={() => setCreateNewEvent(true)}
          onWatch={(event) => setEditEvent(event)}
        />
      )}

      {createNewEvent && (
        <Event_Create
          Id={id}
          Date={clicked}
          onClose={() => setCreateNewEvent(false)}
          onSafe={(event) => {
            setEvents([...events, event]);
            setCreateNewEvent(false);
            setId(id+1);
          }}
        />
      )}

      {editEvent && 
        <Event_Edit
          event={editEvent}
          onClose={() => setEditEvent(null)}
          onDelete={() => {
            setEvents(events.filter((e) => e.id !== editEvent.id));
            setEditEvent(null);}}
          onEdit={(event) => {
 
              setEvents(events.filter((e) => e.id !== event.id).concat(event));
            

          } }
          
        />
      }
    </>
  );
};

export default Calendar;

/**
 * 
 
 * 
 * 
 * 
 * 
 *     <div className={styles.modul}>
        {clicked && (
          <Event_Create
            onClose={() => setClicked(false)}
            onSafe={(title) => {
              setEvents([...events, { title, date: clicked }]);
              setClicked(null);
            }}
          />
        )}
      </div>

      {clicked && eventForDate(clicked) && (
        <Event_Edit
          eventText={eventForDate(clicked).title}
          onClose={() => setClicked(null)}
          onDelete={() => {
            setEvents(events.filter((e) => e.date !== clicked));
            setClicked(null);
          }}
        />
      )}
 */
