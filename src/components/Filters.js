import React, {useState, useEffect} from "react";
import {capitalize, findLanguages} from "../utils"
import GenreData from "../data/genre";

function Filters({movies, filtered, setFiltered, page}) {

    const [genre, selectGenre] = useState(0)    
    const [language, selectLanguage] = useState("all")

    const languages = [...new Set(movies.map(movie => (movie.original_language)))]
    let fullLanguages = findLanguages(languages)

    const languagesArray = [{id:"all", name:"all"}]
    const genreArray = [{id:"0", name:"all"},...GenreData]

    for (let index = 0; index < languages.length - 1; index++) {
        languagesArray.push({
            id: languages[index],
            name: fullLanguages[index]
        })
    }

    useEffect(() => {
        createGenreArray()
    }, [genre, language])
    
    function createGenreArray() {
        let filteredMovies
        if(genre == 0) {
            filteredMovies = movies
            createLanguageArray(filteredMovies)
            return
        } 
        filteredMovies = movies.filter(movie => (movie.genre_ids.includes(genre)))
        createLanguageArray(filteredMovies)
    }

    function createLanguageArray(arr) {
        if(language == "All") return setFiltered(arr)
        return setFiltered(() => arr.filter(movie => (movie.original_language == language.slice(0,2).toLowerCase())))

    }

    
    const languageFilter = (event) => {
        selectLanguage(event.target.value)
    }

    const genreFilter = (event) => {
        console.log(event.target.value);
        const id = event.target.value != "All" ? GenreData.filter(genre => genre.name == event.target.value && genre.id) : 0
        return id === 0 ? selectGenre(0) : selectGenre(parseInt(id[0].id));
    }


    function createOptions(data, option) {
        let filteredOptions = data.map((dat, index) => {
                return <option className={`option ${option}-option`} key={index} id={dat.id}>{capitalize(dat.name)} </option>
        })
        return filteredOptions
    }

    const filteredGenres = createOptions(genreArray, "genre")
    const languageOptions = createOptions(languagesArray, "language")


 return (
     <div className="flex filters">
         <div className="filter-container">
            <label className="selector-label" htmlFor="genreSelector">genre
            </label>
            <select onChange={genreFilter} name="genreSelector" className="option--selector" >
                {filteredGenres}
            </select>
         </div>
        <div className="filter-container">
            <label className="selector-label" htmlFor="languageSelector">language
            </label>
            <select onChange={languageFilter} name="languageSelector" className="option--selector">
                {languageOptions}
            </select>
        </div>
     </div>
 )
}

export default Filters