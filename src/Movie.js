import React, {useState, useEffect} from "react"
import GenreData from "./data/genre"
import findGenres from "./findGenres"

function Movie(props) {
    const genreData = GenreData
    const {original_language, backdrop_path, title, overview, genre_ids, id} = props.movie
    // const genres = [...props.genres]
    

    function openMovieModal(event) {
        const currentMovie = props.movies.filter(movie => {
           return movie.id == event.currentTarget.id && movie
        })
        props.setModal(prev => !prev)
        props.setCurrentMovie(currentMovie)
    }

    
    const newGenres = findGenres(genre_ids)
    

    return (
        <div className="movie-container" id={id} onClick={openMovieModal}>
            <h1 className="title">{title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} alt="movie-img" />
            <div className="lang-syn">
                <h4 className="language">{original_language}</h4>
                {newGenres.map((genre, index) => (<span key={index}>{genre}</span>))}
            </div>
            <p className="synopsis">{overview.slice(0, 100) + "..."}</p>
        </div>
    )
}

export default Movie
