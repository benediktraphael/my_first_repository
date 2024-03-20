import styles from "./Event.module.css"


const Event = ({event}) => {

    return (

        <div className={styles.event}>
            {event.title};
            {event.date};
        </div>
    )


};



export default Event;