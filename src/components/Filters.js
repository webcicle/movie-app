import react, {useState, useEffect} from "react";
import {capitalize} from "../utils"
import GenreData from "../data/genre";
import { nanoid } from 'nanoid'

function Filters({movies, filtered, setFiltered, setPage}) {

    const [genre, selectGenre] = useState(0)    
    const [language, selectLanguage] = useState("all")

    const languages = [...new Set(movies.map(movie => (movie.original_language)))]
    let fullLanguages = languages.map(lang => {
        let language;
        switch (lang){
            case "ja":
                language = "japanese"
                break
            case "hi":
                language = "hindu"
                break
            case "en":
                language = "english"
                break
            case "ko":
                language = "korean"
            }
            return language
    })

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

    let filterGenre = []
    
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
        if(language == "all") return setFiltered(arr)
        return setFiltered(() => arr.filter(movie => (movie.original_language == language)))

    }

    
    const filter = (event) => {
        console.log(isNaN(event.target.id), event.target.id);
        if (isNaN(event.target.id)) return selectLanguage(event.target.id) 
        return selectGenre(parseInt(event.target.id))
        
    }


    function createOptions(data, option) {
        let filteredOptions = data.map((dat, index) => {
                return <option className={`option ${option}-option`} key={index} id={dat.id} onClick={filter}>{capitalize(dat.name)} </option>
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
            <select name="genreSelector" className="option--selector" >
                {filteredGenres}
            </select>
         </div>
        <div className="filter-container">
            <label className="selector-label" htmlFor="languageSelector">language
            </label>
            <select name="languageSelector" className="option--selector">
                {languageOptions}
            </select>
        </div>
     </div>
 )
}

export default Filters