import styles from "./Day.module.css";
import Event_of_Day from "./Event-of-Day/Event-of-Day";

const Day = ({day, onClick}) => {
    
    console.log("Call Day")
    //day.value === padding could set paddingdays colour as gray ?
    return (
        <div onClick={onClick} className= {day.value === 'padding' ? styles.padding : day.isCurrentDay ? styles.currentDay : styles.day}>
            {day.value === 'padding' ? '' : day.value} 

            {day.event && day.event.length !== 0 &&  <div className={styles.event}>{

                day.event.slice(0,3).map( (e, index) => <Event_of_Day key={index} event={e}/>)

                //day.event.slice(0,3).reduce( (acc, cur) => acc = acc + " " +  cur.title, "")
            }</div>
            //day.event.reduce( (acc, cur) => acc = acc + " " +  cur.title, "")
            }
            
        </div>
    );

}


export default Day;