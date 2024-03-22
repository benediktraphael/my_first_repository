import styles from "./Event-Actions.module.css";
import { useState } from "react";

const Event_Actions = ({
  event,
  curDate,
  Id,
  Action,
  onCancel,
  onSafe,
  onEdit,
  onDelete,
}) => {
  const [id, setId] = useState(!event ? Id : event.id);
  const [title, setTitle] = useState(!event ? "" : event.title);
  const [time, setTime] = useState(!event ? "" : event.time);
  const [date, setDate] = useState(!event ? curDate : event.date);
  const [location, setLocation] = useState(!event ? "" : event.location);
  const [tag, setTag] = useState(!event ? "" : event.tag);
  const [description, setDescription] = useState(
    !event ? "" : event.description
  );

  const [action, setAction] = useState(Action);

  const setResult = () =>
    new {
      id: id,
      title: title,
      time: time,
      date: date,
      description: description,
      location: location,
      tag: tag,
    }();

  //If you cancel editing, you want to watch further. If you cancel creating or watching, you want to get to Calendar
  const cancel = (action) => (action === "edit" ? "view" : "");

  return (
    <div className={styles.event}>
      <div className={styles.buttons}>
        <button
          onClick={() => (action === "edit" ? setAction("view") : onCancel)}
        >
          Cancle
        </button>
        {(action === "view" && (
          <button onClick={() => setAction("edit")}>Edit</button>
        )) || (
          <button
            onClick={() => {
              onSafe(setResult());
              action === "edit" ? setAction("view") : onCancel;
            }}
          >
            Safe
          </button>
        )}
        { action === "edit" &&
          <button onClick={onDelete}>Delete</button>}
      </div>

      {(action === "view" && (
        <div className={styles.watchFields}>
          <p>ID {id}</p>
          <p>{time}</p>
          <p>{date}</p>
          <p>{location}</p>
          <p>{description}</p>
          <p>{tag}</p>
        </div>
      )) || (
        <div className={styles.inputFields}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event Title"
          />

          <input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Event Time"
          />

          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Event Date"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Event Description"
          />
          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Event Tag"
          />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Event Location"
          />
        </div>
      )}
    </div>
  );
};

export default Event_Actions;
