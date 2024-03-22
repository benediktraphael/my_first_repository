import styles from "./Day.module.css";

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

        day.event &&  (
          <div className={styles.event}>
            {day.event.slice(0, 3).map((e, index) => (
              <div key={index}>{e.title}</div>
            ))}
          </div>
        )
      }
    </div>
  );
};

export default Day;
