import styles from "./Event-Create.module.css"
import { useState } from "react";

const Event_Create = ({onSafe, onClose}) => {

    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);


    return (

        <><div className={styles.create_event}>
            <h2>New Event</h2>

            <input
            className={error ? styles.error : ''}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Event Title" />

            <button
            onClick={ () => {
                if(title){
                    setError(false);
                    onSafe(title);
                }
                else{
                    setError(true);
                }
            }}
            >Safe</button>


            <button onClick={onClose}>Cancle</button>
        </div>
        <div className={styles.background}></div></>
        
    )


}



export default Event_Create;