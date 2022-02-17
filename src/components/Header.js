import react from 'react'
import Navbar from './Navbar'
import bannerImage from "../images/banner-img-popcorn.jpg"

export default function Header({setModule}) {
    return (
        <header className="header">
            <div className="banner">
                <img src={bannerImage} alt="viktors-movies-banner" 
                className="banner-img"/>
                <h1 className="banner-text app-center">viktor's movies</h1>
            </div>
            <Navbar 
            setModule={setModule}
            />
        </header>
    )
}