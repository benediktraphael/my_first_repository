import styles from "./Events-of-Day.module.css";

import Event from "./Event/Event";

const Events_of_Day = ({ date, events, onNew , onClose }) => {

  return (

    <div className={styles.eventlist}>

      <h3 className={styles.curdate}>{date}</h3>

      <div className={styles.buttons}>

      <button className={styles.newEvent}
      onClick={onClose}>Close</button>


      <button className={styles.newEvent}
      onClick={onNew}>New Event</button>

      </div>
     


      {events &&  

        <div className={styles.event}>{events.map((e, index) => <Event  key={index} event={e}/>)}</div>
      
      }
    </div>
  );
};

export default Events_of_Day;
