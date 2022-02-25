import react from "react";
import { useState } from "react";

export default function Navbar(props) {
    const {setModule} = props;
    const pages = ["home", "popular", "search", ]
    const handleClick = (page) => {
        setModule(page)
        props.setIsOpen(prev => false)
    }
    const menuBtns = pages.map((page, index) => {
        return <li key={index}><button key={index} onClick={() => handleClick(page)} className="nav-link">{page}</button></li>
    })

    
    return (
        <nav className={`navbar ${props.isOpen ? "open" : ""}`}>        
            <ul className="nav-links flex app-center">
                {menuBtns}
            </ul>
        </nav>
    )
}