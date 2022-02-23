import React, {useState, useEffect} from "react"
import GenreData from "../data/genre"
import findGenres from "../findGenres"
import MoviePosterDefault from "../images/no-poster.jpg"
import { getCastCrew } from "../getMovieInfo"

function Movie(props) {
    const genreData = GenreData
    const {original_language, backdrop_path, poster_path, title, overview, genre_ids, id, release_date} = props.movie



    async function openMovieModal(id) {
        const currentCast = await getCastCrew(id)
        const currentMovie = props.movies.filter(movie => {
            return movie.id == id && movie
        })
        props.setCurrentMovie(currentMovie)
        props.setCastCrew(currentCast)
        props.setModal(prev => !prev)
    }

    const newGenres = findGenres(genre_ids)

    return (
        <div className="movie-container" id={id} onClick={() => openMovieModal(id)}>
            <h1 className="title" style={{fontSize: title.length < 30 ? "0.9em" : "0.7em"}}>{title}</h1>
            <img 
            src={poster_path 
            ? `https://image.tmdb.org/t/p/w500${poster_path}` 
            : MoviePosterDefault} 
            alt="movie-img" 
            className="movie-poster"/>
            <div className="lang-syn">
                <h4 className="language">{original_language}</h4>
                {newGenres.map((genre, index) => (<span key={index}>{genre}</span>))}
            </div>
            <p className="synopsis">{overview.slice(0, 100) + "..."}</p>
        </div>
    )
}

export default Movie


