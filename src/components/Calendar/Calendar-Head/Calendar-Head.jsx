import styles from "./Calendar-Head.module.css"


const Calendar_Head = () => {

    return (
        <div  className={styles.container}>
            <div className={styles.child}>Montag</div>
            <div className={styles.child}>Dienstag</div>
            <div className={styles.child}>Mittwoch</div>
            <div className={styles.child}>Donnerstag</div>
            <div className={styles.child}>Freitag</div>
            <div className={styles.child}>Samstag</div>
            <div className={styles.child}>Sonntag</div>
        </div>
    )

};


export default Calendar_Head;