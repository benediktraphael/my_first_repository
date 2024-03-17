import Links from "./links/Links"
import styles from "./Navigationbar.module.css"

const Navigationbar = () => {
    return (
        <div className={styles.container}>
            <div>
                Logo
            </div>
            <div>
            <Links></Links>
            </div>
        </div>
    )

}

export default Navigationbar;