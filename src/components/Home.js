import React, { useState, useEffect } from 'react'
import TrendingMovie from "./TrendingMovie"



export default function Home() {
    const POPULAR_URL = "https://api.themoviedb.org/3/trending/movie/day?api_key=ab5a8743e60fb46ac92262ed98e7fa1c"


    const [trending, setTrending] = useState([])

    useEffect(() => {
        getMovieData(POPULAR_URL)

    }, [])
    
    const getMovieData = async (url) => {
        const data = await fetch(url)
        const response = await data.json()
        setTrending(response.results.slice(0,6))
    }
        
    return (
        <article className="app-center">
            <h1 className="home--title">Trending</h1>
            <div className="trending-container">
                {trending && trending.map((movie, index) => {
                    return <TrendingMovie 
                    id={index}
                    movie={movie}
                    key={index}
                    />
                })}
            </div>
        </article>
    )
}
