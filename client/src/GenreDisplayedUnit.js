import React from 'react';
import './view/GenreDisplayed.css';

export default function GenreDisplayed({ animeImg, name }) {
    return (
        <div className="genreDisplayed">
            <img src={animeImg} />
            <div className="genreNameDisplayed">{name}</div>
        </div>
    )
}
export { GenreDisplayed };