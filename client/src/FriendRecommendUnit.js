import React from 'react';
import './view/AnimeDisplayed.css';

export default function FriendDisplayed({ Img, name, distance }) {
    return (
        <div className="animeDisplayed">
            <img src={Img} />
            <div className="friendNameDisplayed">{name}</div>
            <div className="friendDegreeDisplayed">Friendship Degree: {distance}</div>
        </div>
    )
}
export { FriendDisplayed };