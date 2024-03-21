import styles from "./Event-Create.module.css";
import { useState } from "react";

const Event_Create = ({ onSafe, onClose, Id, Date }) => {
  const [id, setId] = useState(Id);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState(Date);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState(""); //what category ? training? tournament?

  const [error, setError] = useState(false);

  return (
    <>
      <div className={styles.create_event}>
        <h2>New Event</h2>

        <input
          className={error ? styles.error : ""}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
        />

        <input
          className={error ? styles.error : ""}
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Event Time"
        />

        <input
          className={error ? styles.error : ""}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Event Date"
        />
        <input
          className={error ? styles.error : ""}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Event Description"
        />
        <input
          className={error ? styles.error : ""}
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Event Tag"
        />
        <input
          className={error ? styles.error : ""}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Event Location"
        />
        <button
          onClick={() => {
            if (title) {
              setError(false);
              onSafe({
                id: id,
                title: title,
                time: time,
                date: date,
                description: description,
                tag: tag,
              });
            } else {
              setError(true);
            }
          }}
        >
          Safe
        </button>

        <button onClick={onClose}>Cancle</button>
      </div>
    </>
  );
};

export default Event_Create;
