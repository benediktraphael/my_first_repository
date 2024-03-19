import styles from "./Day.module.css"

const Day = ({day, onClick}) => {
    


    //day.value === padding could set paddingdays colour as gray ?
    return (
        <div onClick={onClick} className= {day.value === 'padding' ? styles.padding : day.isCurrentDay ? styles.currentDay : styles.day}>
            {day.value === 'padding' ? '' : day.value} 

            {day.event && <div className={styles.event}>{day.event.title}</div>}

        </div>
    );

}


export default Day;