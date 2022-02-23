import React, {useEffect, useState} from "react"
import './App.css';
import Movie from './Movie'
import MovieModal from './MovieModal'
import Filters from './Filters'
import LoadMore from './LoadMore'

export default function Popular(props) {

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

    if(page === 1 && movies.length === 20) {
      setMovies(response.results)
      setFiltered(response.results)
      setLoading(false)
      return
    }
      setFiltered(prev => ([...prev, ...response.results]))
      setMovies(prev => ([...prev, ...response.results]))
      setLoading(false)
  }

  

  return (

      <div className="app-center">
        {modal && <MovieModal movies={movies} castCrew={props.castCrew} currentMovie={currentMovie} setCurrentMovie={setCurrentMovie} setModal={setModal}/>}
        <h1>Popular movies</h1>
        <Filters  movies={movies} filtered={filtered} setFiltered={setFiltered} setPage={setPage}/>
        <div className="movies-container">
          {filtered.length > 0 && !loading ? filtered.map((movie, index) => {
              return <Movie 
              key={index} 
              movie={movie}
              movies={movies}
              setCurrentMovie={setCurrentMovie}
              setModal={setModal}
              page={page}
              castCrew={props.castCrew}
              setCastCrew={props.setCastCrew}
              />
            }) : <h1>Sorry, no movies in this category</h1> }
            {loading && <h1>Loading...</h1>}
        </div>
        <LoadMore 
            setPage={setPage}
            page={page}
        />
      </div>
            )}