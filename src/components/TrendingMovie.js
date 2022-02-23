import React from 'react'
import popcornImg from "../images/banner-img-popcorn.jpg"



export default function TrendingMovie(props) {

    const {backdrop_path, title, id, overview} = props.movie

    // console.log(props.movie, backdrop_path);

    const backdropImg = backdrop_path != null ? `https://image.tmdb.org/t/p/w500${backdrop_path}` : popcornImg

    return (
    <div className="grid-movie" id={`trending-${props.id}`}>
        <img src={backdropImg} alt="" className="grid-movie--img" />
        <p className="grid-movie--title">{title}</p>
        <p className="grid-movie--desc">{overview.slice(0, 250) + "..."}</p>
    </div>
  )
}
