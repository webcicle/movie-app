import react from "react";

export default function Navbar(props) {
    const {setModule} = props;
    const pages = ["home", "popular", "search", "movie hours"]
    const menuBtns = pages.map((page, index) => {
        return <li key={index}><button key={index} onClick={() => setModule(page)} className="nav-link">{page}</button></li>
    })
    
    return (
        <nav className="navbar"><ul className="nav-links flex app-center">
            {menuBtns}
        </ul></nav>
    )
}