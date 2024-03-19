import Links from "./links/Links"
import styles from "./Navigationbar.module.css"
import Image from "next/image"
import logo from "../../../public/logo.jpg"

const Navigationbar = () => {
    return (
        <div className={styles.container}>
            <div >
                <Image src={logo} alt="Logo" className={styles.logo}/>
            </div>
            <div className={styles.links}>
                <Links/>
            </div>
        </div>
    )

}

export default Navigationbar;