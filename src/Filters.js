import react from "react";
import GenreData from "./data/genre";
import { nanoid } from 'nanoid'

function Filters({movies, filtered, setFiltered}) {

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

    const languagesArray = []

    for (let index = 0; index < languages.length; index++) {
        languagesArray.push({
            id: languages[index],
            name: fullLanguages[index]
        })
    }




    const filterMovies = (event) => {
        if(event.target.id === "all") {
            setFiltered(movies)
            return
        }

        const filteredMovies = movies.filter(movie => {
            if(isNaN(event.target.id)){
                return movie.original_language === event.target.id
            } else {
                return movie.genre_ids.includes(JSON.parse(event.target.id))
            }
        })

        setFiltered(filteredMovies)
    }

    function createOptions(data, option) {
        let filteredOptions = data.map((dat, index) => {
                return <option className={`option ${option}-option`} key={index} id={dat.id} onClick={filterMovies}>{dat.name} </option>
        })

        filteredOptions = [<option className={`${option}-option`} key="all" id="all" onClick={filterMovies}>All</option>, ...filteredOptions]
        return filteredOptions
    }

    const filteredGenres = createOptions(GenreData, "genre")
    const languageOptions = createOptions(languagesArray, "language")
    console.log(languageOptions);


 return (
     <div className="flex filters">
         <select className="option--selector">
            {filteredGenres}
         </select>
         <select className="option--selector">
            {languageOptions}
         </select>
     </div>
 )
}

export default Filters