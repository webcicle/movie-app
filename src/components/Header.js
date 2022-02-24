import react from 'react'
import Navbar from './Navbar'
import bannerImage from "../images/banner-img-popcorn.jpg"
import { useState } from 'react'

export default function Header({setModule, setIsOpen, isOpen}) {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 572)

    const handleClick = () => {
        setIsOpen(prevState => (!prevState))
    }

    window.addEventListener("resize", () => {
        setIsMobile(window.innerWidth < 572)
    })



    return (
        <header className="header">
            <div className="banner">
                <img src={bannerImage} alt="viktors-movies-banner" 
                className="banner-img"/>
                <h1 className="banner-text app-center">viktor's movies</h1>
                {isMobile && <button onClick={handleClick} className="nav-btn">
                    { isOpen ?
                        <svg className="close-btn--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"/></svg> : 
                        <svg className="close-btn--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"/></svg>
                    }
                </button>}
            </div>
            <Navbar 
            setModule={setModule}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            />
        </header>
    )
}