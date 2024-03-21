import styles from "./Day.module.css";
import Event_of_Day from "./Event-of-Day/Event-of-Day";

const Day = ({ day, onClick }) => {
  console.log("Call Day");

  const day_style =
    day.value === "padding"
      ? styles.padding
      : day.isCurrentDay
      ? styles.currentDay
      : styles.day;

  return (
    <div onClick={onClick} className={`${day_style}`}>
      {day.value === "padding" ? "" : day.value}

      {
        //maybe drop it for just coloured dots, indicating the tags

        day.event && day.event.length !== 0 && (
          <div className={styles.event}>
            {day.event.slice(0, 3).map((e, index) => (
              <Event_of_Day key={index} event={e} />
            ))}
          </div>
        )
      }
    </div>
  );
};

export default Day;
