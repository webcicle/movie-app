import React, {useEffect, useState} from "react"
import './App.css';
import Movie from './Movie'
import MovieModal from './MovieModal'
import Filters from './Filters'
import LoadMore from './LoadMore'

export default function App(props) {

  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)

  const { modal, setModal, currentMovie, setCurrentMovie} = props

  const POPULAR_MOVIES_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=ab5a8743e60fb46ac92262ed98e7fa1c&language=en-US&page=${page}`
  
  useEffect(() => {
    getMovieData(POPULAR_MOVIES_URL)

  }, [page])
  
  
  const getMovieData = async (url) => {
    const data = await fetch(url)
    const response = await data.json()

    if(page === 1) {
      setMovies(response.results)
      setFiltered(response.results)
      setLoading(false)
      return
    }
    if(page > 1) {
      setFiltered(prev => ([...prev, ...response.results]))
      setLoading(false)
    }
  }

  console.log(filtered);

  return (

      <div className="app-center">
        {modal && <MovieModal movies={movies} currentMovie={currentMovie} setModal={setModal}/>}
        <h1>Popular movies</h1>
        <Filters  movies={movies} filtered={filtered} setFiltered={setFiltered} setPage={setPage}/>
        <div className="movies-container">
          {filtered.length > 0 ? filtered.map((movie, index) => {
              return <Movie 
              key={index} 
              movie={movie}
              movies={movies}
              setCurrentMovie={setCurrentMovie}
              setModal={setModal}
              />
            }) : <h1>Sorry, no movies in this category</h1> }
            {loading && <h1>Loading...</h1>}
        </div>
        <LoadMore 
            setPage={setPage}
        />
      </div>
            )}