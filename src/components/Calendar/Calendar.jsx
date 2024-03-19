"use client"
import React, { useState, useEffect } from "react";
import Calendar_Head from "./Calendar-Head/Calendar-Head";
import Day from "./Day/Day";
import styles from "./Calendar.module.css"
import Event_Create from "./Event-create/Event-Create";

const Calendar = () => {

    //monthOffset is the current month we are on. 
    //The offset allows us to skip through the other month in relation to current month
    const [monthOffset, setMonthOffest] = useState(0);
    const [days, setDays] = useState([]);
    const [dateDisplay, setDateDisplay] = useState("");
    const [clicked, setClicked] = useState();
    const [events, setEvents] = useState(
        localStorage.getItem('events') ?
        JSON.parse(localStorage.getItem('events')) :
        []
        );

    const eventForDate = date => events.find(e => e.date === date);
    
    //should events change, we write the changes in the local storage
    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    useEffect(() => {
        const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

        const dt = new Date();
        console.log(dt)
        if(monthOffset !== 0){
            dt.setMonth(new Date().getMonth + monthOffset);
        }

        const day = dt.getDate();
        const month = dt.getMonth();
        const year = dt.getFullYear();

        //first Weekday
        const firstDayOfMonth = new Date(year, month, 1);
        //Number of Days in month
        const daysInMonth = new Date(year, month+1, 0).getDate();

        //creates a String in Format Freitag 1.3.2024
        const dateString = firstDayOfMonth.toLocaleDateString('de', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day:'numeric',
        });

        //setDateDisplay(`${dt.toLocaleDateString('de', {month: 'long'})} ${year}`);
        
        const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
        console.log(day);
        const daysArr = [];

        for(let i = 1; i <= paddingDays + daysInMonth; i++ ){
            const dayString = `${month + 1} / ${i - paddingDays} / ${year}`;

            if(i <= paddingDays){
                daysArr.push({
                    value: "padding",
                    event: null,
                    isCurrentDay: false,
                    date: "",
                })
            }
            
            else{
                daysArr.push({
                    value: i - paddingDays,
                    event: eventForDate(dayString),
                    isCurrentDay: (i - paddingDays === day && monthOffset === 0),
                    date: dayString,
                }
                )
            }
        }
        
        setDays(daysArr);
    }, [events, monthOffset]);

    return (
            <>
            <div className={styles.calendar}>
            <div className={styles.head}>
                <Calendar_Head />
            </div>
            <div className={styles.days}>
                {days.map((d, index) => (
                    <Day
                        key={index}
                        day={d}
                        onClick={() => { d.value !== 'padding' ? setClicked(d.date) : null; } } />
                ))}
            </div>
        </div>
        <div className={styles.modul}>

        { clicked && <Event_Create
        onSafe={title => {
            setEvents([...events, {title, date: clicked}]);
            setClicked(null);
        }}
        />}
        </div>

        
        </>
            
    )

}

export default Calendar;