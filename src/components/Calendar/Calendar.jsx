"use client";
import styles from "./Calendar.module.css";
import React, { useState, useEffect } from "react";
import Calendar_Head from "./Calendar-Head/Calendar-Head";
import Day from "./Day/Day";
import Event_Create from "./Event-create/Event-Create";
import Event_Edit from "./Event-edit/Event-Edit";
import Events_of_Day from "./Events-of-Day/Events-of-Day";
import Event_Actions from "./Event-Actions/Event-Actions";

const Calendar = () => {
  const [monthOffset, setMonthOffest] = useState(0);
  const [days, setDays] = useState([]);
  const [dateDisplay, setDateDisplay] = useState(""); // Month Year || März 2024
  const [clicked, setClicked] = useState();
  const [events, setEvents] = useState(
    typeof window !== "undefined" &&
      localStorage &&
      localStorage.getItem("events")
      ? JSON.parse(localStorage.getItem("events"))
      : []
  );

  const weekdays = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag",
  ];

  const eventForDate = (date) => events.filter((e) => e.date === date);

  //should events change, we write the changes in the local storage
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  //This useEffect will create the days of the month (tiles, events, etc..)
  useEffect(() => {
    console.log("Calendar , do the work");

    const dt = new Date();

    if (monthOffset !== 0) {
      dt.setMonth(dt.getMonth() + monthOffset);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    //Date has this Format: Fri Mar 01 2024 00:00:00 GMT+0100
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

    //Format März 2024, for the Head of Calendar
    setDateDisplay(`${dt.toLocaleDateString("de", { month: "long" })} ${year}`);

    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

    const daysArr = [];

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      //Needs to be changed to German Style. Somewhere it depends on it
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
          event: eventForDate(dayString), //changing
          isCurrentDay: i - paddingDays === day && monthOffset === 0,
          date: dayString, //changing
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
  const [id, setId] = useState(
    events.length !== 0 ? events[events.length - 1].id + 1 : 0
  );

  console.log("re render Calendar");
  console.log(editEvent, "editEvent");
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
              onClick={() =>
                d.value !== "padding" ? setClicked(d.date) : null
              }
            />
          ))}
        </div>
      </div>

      {clicked && (
        <Events_of_Day
          date={clicked}
          events={eventForDate(clicked)}
          onClose={() => setClicked(false)}
          onNew={() => setEditEvent({})}
          onWatch={(event) => setEditEvent(event)}
        />
      )}

{(editEvent) && (
        <Event_Actions
          event={Object.keys(editEvent).length === 0 ? null : editEvent}
          curDate={clicked}
          Id={id}
          Action={Object.keys(editEvent).length === 0 ? "create" : "view"}
            onCancel={() => {
            setEditEvent(null);}}
          onSafe={(event) => {
           Object.keys(editEvent).length === 0 ? setEvents([...events, event])
                     : setEvents(events.filter((e) => e.id !== event.id).concat(event));
            ;
            setId(id + 1);
          }}
          onDelete={() => {
            setEvents(events.filter((e) => e.id !== editEvent.id));
          }}
        />
      )}

     
    </>
  );
};

export default Calendar;



/*
 {createNewEvent && (
        <Event_Create
          Id={id}
          Date={clicked}
          onClose={() => setCreateNewEvent(false)}
          onSafe={(event) => {
            setEvents([...events, event]);
            setCreateNewEvent(false);
            setId(id + 1);
          }}
        />
      )}

      {editEvent && (
        <Event_Edit
          event={editEvent}
          onClose={() => setEditEvent()}
          onDelete={() => {
            setEvents(events.filter((e) => e.id !== editEvent.id));
            setEditEvent(null);
          }}
          onEdit={(event) => {
            setEvents(events.filter((e) => e.id !== event.id).concat(event));
          }}
        />
      )}
*/