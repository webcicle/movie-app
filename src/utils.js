import react from "react"

export  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function findLanguages(arr) {
    return arr.map(lang => {
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
                break
            case "es":
                language = "spanish"
                break
            case "it":
                language = "italian"
                break
            case "fr":
                language = "french"
                break
            case "zh":
                language = "mandarin"
                break
            case "ru":
                language = "russian"
                break
            case "ar":
                language = "arabic"
                break
            case "sv":
                language = "swedish"
                break
            case "de":
                language = "german"
                break
            case "tr":
                language = "turkish"
                break
            case "pt":
                language = "portuguese"
            }
            return language
    })
}
