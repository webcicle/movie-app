import React from 'react'
import { useState } from 'react/cjs/react.development'




export const getCastCrew = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id && id || "718032"}/credits?api_key=ab5a8743e60fb46ac92262ed98e7fa1c&language=en-US`

    const response = await fetch(url)
    const data = await response.json()
    return data
}

export const getPersonalCredits = async (id, setCurrentPerson) => {
    const url = `https://api.themoviedb.org/3/person/${id && id || "32"}/combined_credits?api_key=ab5a8743e60fb46ac92262ed98e7fa1c&language=en-US`

    const response = await fetch(url)
    const data = await response.json()
    // setCurrentPerson(data)
    return data
}

export const getPerson = async (id) => {
    const url = `https://api.themoviedb.org/3/person/${id ? id : "35742"}?api_key=ab5a8743e60fb46ac92262ed98e7fa1c&language=en-US`
    const response = await fetch(url)
    const data = await response.json()
    return data
}
