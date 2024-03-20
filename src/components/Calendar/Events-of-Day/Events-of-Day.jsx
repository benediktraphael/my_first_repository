import styles from "./Events-of-Day.module.css";

import Event from "./Event/Event";

const Events_of_Day = ({ date, events }) => {

  return (

    <div className={styles.eventlist}>

      <h3 className={styles.curdate}>{date}</h3>

      {events && events.length > 0 && 

        <div className={styles.event}>{events.map((e) => <Event event={e}/>)}</div>
      
      }
    </div>
  );
};

export default Events_of_Day;
