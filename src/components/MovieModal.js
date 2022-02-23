import React, {useState, useEffect} from "react"
import findGenres from "../findGenres"
import "./App.css"
import popcornImg from "../images/banner-img-popcorn.jpg"
import MoviePosterDefault from "../images/no-poster.jpg"
import { getPersonalCredits, getPerson } from "../getMovieInfo"

function MovieModal(props) {

    // setup state for currentPerson as well and have it
    // set when you click a face. then all the faces need to become
    // the actor's movies and when you click them, it needs to go 
    // back to the other and so on. 
    // movie uses find API and ID from attribute, loads straight into
    // currentMovie state and once person {selected} is set to false 
    // the different fields will change. 


    const [displayedInfo, setDisplayedInfo] = useState(props.currentMovie[0])
    const [currentCredits, setCurrentCredits] = useState([])
    const [person, setPerson] = useState({
        selected: false,
        person: {},
        credits: {}
    })

    const handleClick = async (event) => {
        const personData = await getPerson(event.target.id)
        const personCredits = await getPersonalCredits(event.target.id)

        await setPerson(prev => (
            {
            ...prev,
            selected: true,
            person: personData,
            credits: personCredits
        }
        ))
        setDisplayedInfo(personData)
        console.log(displayedInfo);
    }


    
    const {name, birthday, gender, place_of_birth, also_known_as, homepage, biography, profile_path, original_language, backdrop_path, title, overview, genre_ids, id, popularity, vote_average, vote_count, original_title, poster_path, release_date} = displayedInfo
    console.log(!Array.isArray(biography));
    const biographyEdit = () => {
        const cutFirst = biography && biography.split("encyclopedia.")[1]
        if(biography && cutFirst) return cutFirst.split("Description above")[0]
        if(biography && !cutFirst) return biography.split("Description above")[0]
        return 
    }

    console.log(biographyEdit());

    const genres = genre_ids && findGenres(genre_ids)
    const backdropImg = backdrop_path != null ? `https://image.tmdb.org/t/p/w500${backdrop_path}` : popcornImg

    const modalBgStyles = {
        backgroundImage: `url(${backdropImg})`,
        backgroundPosition: "center",
        bacgroundSize:"cover",
        backgrounRepeat: "no-repeat",
        backgroundSize: "100%",

    }

    const CastCard = (props) => {        
        const info = `${props.cast.name}${props.cast.character ? " as " : ", "}${props.cast.character || props.cast.job}`
        
        return (
            <div className="cast-card" id={props.cast.id} data-info={info} onClick={handleClick}>
                <img className="cast-card-img" src={props.cast.profile_path ? `https://image.tmdb.org/t/p/w500${props.cast.profile_path}` : MoviePosterDefault}></img>
            </div>
        )
    }


    function createCastCards(cast) {
        const castCards = cast.map((castMemb, index) => (
            <CastCard cast={castMemb} key={index} setCurrentMovie={props.setCurrentMovie} />
        ))
        return castCards
    }

    const handleClose = () => {
        props.setModal(false)
        setPerson(prev => (
            {
            ...prev,
            selected: false,
        }
        ))
    }

    const crewFilter = props.castCrew.crew.filter(crew => crew.job == "Director" || crew.job == "Producer" || crew.job == "Writer")

    return (
        <div className="movie-modal--bg">
            <div className="movie-modal" style={modalBgStyles} >
                <button onClick={handleClose} className="close-btn">
                    <svg className="close-btn--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"/></svg>
                </button>
                <aside className="modal--sidebar">
                    {poster_path && <img 
                    className="modal--img" 
                    src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : MoviePosterDefault} 
                    alt={`movie-img-${title}`}
                    />}
                    {profile_path && <img 
                    className="modal--img" 
                    src={profile_path ? `https://image.tmdb.org/t/p/w500${profile_path}` : MoviePosterDefault} 
                    alt={`profile-img-${name}`}
                    />}
                    {person.selected &&
                        <div className="pers-stats">
                            <p className="pers-stat">{gender === 2 ? "Male" : "Female"}</p>
                            <p className="pers-stat">{`Place of birth: ${place_of_birth}`}</p>
                            {homepage && <a href={homepage} _blank className="pers-stat">Homepage</a>}
                        </div>}
                    {!person.selected &&<div className="modal--genres">{genres.map((genre, index) => <span key={index} className="modal--genre">{genre}</span>)}</div>}
                    {!person.selected &&<div className="flex modal--lang-rat">
                        <span className="modal--language">{original_language.toUpperCase()}</span>
                        <div className="modal--rating flex">
                            <svg className="rating--star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7zM288 376.4L288.1 376.3L399.7 435.9L378.4 309.6L469.2 219.8L343.8 201.4L288.1 86.85L288 87.14V376.4z"/></svg>
                            <span className="modal--rating">{`${vote_average} (${vote_count})`}</span>
                        </div>
                    </div>}
                </aside>
                <div className="modal-info">
                    <div className="flex modal--header">
                        <h1 className="modal--title">{title || name}</h1>
                        {<p className="modal--year">{!person.selected && `(${release_date.slice(0, 4)})`}</p>}
                    </div>
                    <div className="modal--subtitle">
                        {person.selected && <p className="modal--subtitle modal--aka-container">Also known as: <span>{also_known_as.map(aka => (<span className="modal--aka">{`${aka}, `}</span>))}</span></p>}
                        <div className="flex">
                            {original_title && original_title !== title && <p className="modal--og-title">{original_title}</p>} 
                            {birthday && <p className="modal--og-title">{`Birthday: ${birthday}`}</p>}
                            <p className="modal--og-title">{`Popularity: ${popularity}`}</p>
                        </div>
                    </div>
                    <p className="modal--description">{overview ? overview : biographyEdit() }</p>
                    <div className="modal--cast-crew flex">
                        <div className="cast-box">
                            <p className="cast-crew--title">{person.selected ? "Movies" : "Cast"}</p>
                            <div className="modal--cast-crew">
                                {createCastCards(props.castCrew.cast).splice(0, 20)}
                            </div>
                        </div>
                        {!person.selected && <div className="crew-box">
                            <p className="cast-crew--title">Crew</p>
                            <div className="modal--cast-crew">
                                {createCastCards(crewFilter).splice(0, 2)}
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieModal