import React, {useEffect, useState} from "react"
import './App.css';
import Movie from './Movie'
import MovieModal from './MovieModal'
import Filters from './Filters'

function App() {

  // const URL = "../data/250-most-pop-mov.json"
  const POPULAR_MOVIES_URL = "https://api.themoviedb.org/3/movie/top_rated?api_key=ab5a8743e60fb46ac92262ed98e7fa1c&language=en-US"

  const [movies, setMovies] = useState([])
  const [filtered, setFiltered] = useState([])
  const [modal, setModal] = useState(false)
  const [currentMovie, setCurrentMovie] = useState({})
  
  useEffect(() => {
    getMovieData(POPULAR_MOVIES_URL)

  }, [])
  
  
  const getMovieData = async (url) => {
    const data = await fetch(url)
    const response = await data.json()
    setMovies(response.results)
    setFiltered(response.results)
  }


  

  return (
    <div className="App">
        {modal && <MovieModal movies={movies} currentMovie={currentMovie} setModal={setModal}/>}
        <h1>Popular movies</h1>
        <Filters  movies={movies} filtered={filtered} setFiltered={setFiltered}/>
      <div className="movies-container">
        {filtered.length > 0 ? filtered.map(movie => {
          return <Movie 
          key={movie.id} 
          movie={movie}
          movies={movies}
          setCurrentMovie={setCurrentMovie}
          setModal={setModal}
/>
        }) : <h1>Sorry, no movies in this category</h1>}
      </div>
    </div>
  );
}

export default App;
