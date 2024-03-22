import styles from "./Events-of-Day.module.css";

const Events_of_Day = ({ date, events, onNew, onClose, onWatch }) => {
  const auth = true; //only authorized people can create Events

  return (
    <div className={styles.eventlist}>
      <h3 className={styles.curdate}>{date}</h3>

      <div className={styles.buttons}>
        <button className={styles.close} onClick={onClose}>
          Close
        </button>

        {auth && (
          <button className={styles.newEvent} onClick={onNew}>
            New Event
          </button>
        )}
      </div>

      {events && (
        <div className={styles.events}>
          {events.map((e) => (
            <div
              className={styles.event}
              onClick={()  => onWatch(e)}
            >{`${e.title} ${e.time}`}</div>
          ))}
        </div>
      )}  
    </div>
  );
};

export default Events_of_Day;
