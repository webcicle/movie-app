import React from "react"
import findGenres from "./findGenres"
import "./App.css"

function MovieModal(props) {
    
    const {original_language, backdrop_path, title, overview, genre_ids, id, popularity, vote_average, vote_count, original_title, poster_path} = props.currentMovie[0]

    // console.log(props);

    const genres = findGenres(genre_ids)

    return (
        <div className="movie-modal--bg">
            <div className="movie-modal">
                <button onClick={() => props.setModal(false)} className="close-btn">
                    <svg className="close-btn--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"/></svg>
                </button>
                <aside className="movie--sidebar">
                    <img className="movie--img" src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} alt={`movie-img-${title}`} />
                    <div className="movie--genres">{genres.map(genre => <span key={Math.ceil(Math.random() * 2000)} className="movie--genre">{genre}</span>)}</div>
                    <div className="flex">
                        <span className="movie--language">{original_language}</span>
                        <div className="movie--rating">
                            <svg className="rating--star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7zM288 376.4L288.1 376.3L399.7 435.9L378.4 309.6L469.2 219.8L343.8 201.4L288.1 86.85L288 87.14V376.4z"/></svg>
                            <span className="movie--rating">{`${vote_average}(${vote_count})`}</span>
                        </div>
                    </div>
                </aside>
                <div className="movie-info">
                    <h1 className="movie--title">{title}</h1>
                    <div className="flex movie--subtitle">
                        <p className="movie--og-title">{original_title}</p>
                        <p className="movie--og-title">{`Popularity: ${popularity}`}</p>
                    </div>
                    <p className="movie--description">{overview}</p>
                </div>
            </div>
        </div>
    )
}

export default MovieModal