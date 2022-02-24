import React from 'react'
import MoviePosterDefault from "../images/no-poster.jpg"


export const CastCard = (props) => {        
    const info = `${props.cast.name}${props.cast.character ? " as " : ", "}${props.cast.character || props.cast.job}`

    
    return (
        <div className="cast-card" id={props.cast.id} data-info={info} onClick={props.handleClick}>
            <img className="cast-card-img" src={props.cast.profile_path ? `https://image.tmdb.org/t/p/w500${props.cast.profile_path ? props.cast.profile_path : props.cast.poster_path}` : MoviePosterDefault}></img>
        </div>
        )
}

