import styles from "./Event-Edit.module.css"

const Event_Edit = ({onDelete, eventText, onClose}) => {

    return(

        <>

        <p>{eventText}</p>

        
        <button
        className={styles.deleteButton}
        onClick={onDelete}
        >Delte Event</button>

        <button
        className={styles.safeChangesButton}
        >Safe Changes</button>

        <button
        className={styles.cancel}
        onClick={onClose}
        >Cancel</button>

        </>
    )
}


export default Event_Edit;