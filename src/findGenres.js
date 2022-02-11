import React from "react"
import GenreData from "./data/genre"

export default function findGenres(genre_ids) {
    const newGenres = []

    for (let index = 0; index < genre_ids.length; index++) {
        const id = genre_ids[index];
        let name = GenreData.filter(genre => {
            if(genre.id === id) {
                return genre
            } else return
        })
        name = name[0].name
        newGenres.push(name)
    }
    return newGenres
}
