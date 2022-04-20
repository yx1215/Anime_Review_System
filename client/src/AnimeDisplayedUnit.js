import React from 'react';
import './view/AnimeDisplayed.css';
import anime from "./image/anime.jpeg";

export default function AnimeDisplayed({animeImg, name}){
    return(
        <div className="animeDisplayed">
            <img src={animeImg} />
            <div className="animeNameDisplayed">{name}</div>
        </div>
    )
}
export { AnimeDisplayed };
