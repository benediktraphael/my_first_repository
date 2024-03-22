import styles from "./Event-Edit.module.css";
import { useState } from "react";

const Event_Edit = ({ onDelete, onClose, event, onEdit }) => {
  const [edit, setEdit] = useState(false);

  const [title, setTitle] = useState(event.title);
  const [time, setTime] = useState(event.time);
  const [date, setDate] = useState(event.date);
  const [location, setLocation] = useState(event.location);
  const [description, setDescription] = useState(event.description);
  const [tag, setTag] = useState(event.tag);

  const [error, setError] = useState(false);
  console.log("22.03 ", event)
  return (
    <div className={styles.ed}>
      <p>{title}</p>

      {(!edit && <button onClick={() => setEdit(true)}>Edit</button>)
      
      || (
        <button onClick={() => {
          setEdit(false);
          onEdit({
            id: event.id,
            title: title,
            time: time,
            date: date,
            description: description,
            tag: tag,
          });
        }}>Safe</button>
      )}

      <button className={styles.deleteButton} onClick={onDelete}>
        Delte Event
      </button>

      <button className={styles.cancel} onClick={onClose}>
        Cancel
      </button>

      {(!edit && (
        <div className={styles.showEvent}>
          <p>ID {event.id}</p>
          <p>{time}</p>
          <p>{date}</p>
          <p>{location}</p>
          <p>{description}</p>
          <p>{tag}</p>
        </div>
      )) || (
        <div>
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
        </div>
      )}
    </div>
  );
};

export default Event_Edit;
