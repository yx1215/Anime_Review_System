import React from 'react';
import './view/GenreDisplayed.css';

async function redirectToAnime(genre){
    window.location.replace(`/searchResult?Genre=${genre}`);
}
export default function GenreDisplayed({ animeImg, name }) {
    return (
        <div className="genreDisplayed" onClick={()=>{redirectToAnime(name)}}>
            <img src={animeImg} />
            <div className="genreNameDisplayed">{name}</div>
        </div>
    )
}
export { GenreDisplayed };
