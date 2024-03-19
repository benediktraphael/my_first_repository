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
        name: "Tuniere",
        path: "/Tuniere"
        },
        {
        name: "Mannschaft",
        path: "/Mannschaft"
        },
        {
        name: "Mitglieder",
        path: "/Mitglieder"
        },
        {
        name: "Galerie",
        path: "/Galerie"
        },
        {
        name: "Mitglied werden",
        path: "/register"
        },
        {
        name: "Impressum",
        path: "/Impressum"
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