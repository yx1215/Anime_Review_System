import React from 'react';
import './view/AnimeDisplayed.css';

export default function FriendDisplayed({name, distance}){
    return(
        <div className="animeDisplayed">
            <img src=''/>
            <div className="animeNameDisplayed">{name}</div>
            <div className="animeNameDisplayed">distance: {distance}</div>
        </div>
    )
}
export { FriendDisplayed };
