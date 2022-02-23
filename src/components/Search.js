import { useState, useEffect } from "react/cjs/react.development";
import Movie from "./Movie";
import MovieModal from "./MovieModal";
import LoadMore from "./LoadMore"


export default function Search(props) {
    const {searchURL, setMovies, movies, currentMovie, setCurrentMovie, setModal, modal} = props;

    const [searchedMovies, setsearchedMovies] = useState([])
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)

    let SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=ab5a8743e60fb46ac92262ed98e7fa1c&language=en-US&query=${search}&page=${page}&include_adult=false`

    if(search == "") {
        SEARCH_URL = "https://api.themoviedb.org/3/movie/top_rated?api_key=ab5a8743e60fb46ac92262ed98e7fa1c&language=en-US&page=2"
    }
    
    
    useEffect(() => {
        fetchSearch(SEARCH_URL)
    }, [search, page])
    
    const fetchSearch = async (url) => {
        const data = await fetch(url)
        const response = await data.json()
        if(page === 1) setsearchedMovies(response.results)
        if(page > 1) setsearchedMovies(prev => ([...prev, ...response.results]))
    }
    
    function handleChange(event) {
        if(page > 1) {
            setsearchedMovies([])
            setPage(1)
        }
        setSearch(event.target.value)
    }

    function clearSearch(){
        setSearch("")
    }
    

    return (
        <div className="app-center">
            {modal && <MovieModal currentMovie={currentMovie} castCrew={props.castCrew} setModal={setModal}/>}
            <h1>it's search, cunt</h1>
            <form className="search-form">
                <input 
                type="text" 
                placeholder="Type a movie title to search"
                value={search}
                onChange={handleChange} 
                className="search-field" />
                {search && <button 
                className="close-btn search-clear"
                onClick={clearSearch}
                >
                    <svg className="close-btn--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"/></svg>
                    </button>}
            </form>
            <div className="movies-container">
          {searchedMovies && searchedMovies.map((movie, index) => {
              return <Movie 
              key={index} 
              movie={movie}
              movies={searchedMovies}
              setCurrentMovie={setCurrentMovie}
              setModal={setModal}
              castCrew={props.castCrew}
            setCastCrew={props.setCastCrew}
              />
            })}
            {searchedMovies && search && searchedMovies.length === 0 && <h1>Sorry, no matches for your search</h1>}
            {!searchedMovies && <h1>fuck da police</h1>}
            </div>
            {searchedMovies && <LoadMore 
            setPage={setPage}
            page={page}
            />}
        </div>

    )
}