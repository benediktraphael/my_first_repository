import styles from "./Event.module.css"


const Event = ({event, onWatch2}) => {

    return (

        <div className={styles.event}
            onClick={() => onWatch2(event)}>
            {event.title};
            {event.date};
        </div>
    )


};



export default Event;