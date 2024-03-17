import Link from "next/link"
import styles from "./Links.module.css"
import NavLink from "./navLink/navLink";

const Links = () => {

    const link_array = [
        {
        name: "Home",
        path: "/"
        },
        {
        name: "Mannschaft",
        path: "/Mannschaft"
        },
    ];
    return (
        <div className={styles.links}>
            {link_array.map((link)=> (
            <NavLink item={link} key={link.name}/>
            ))}
            
        </div>
    )

};

export default Links;