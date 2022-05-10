import React from 'react';
import './view/AnimeDisplayed.css';
import female from "./image/woman.jpeg";
import male from "./image/male.jpeg";
import unknown from "./image/unknown.jpeg";

async function redirectToFriendProfile(userId){
    window.location.replace(`/profile?userId=${userId}`)
}

export default function FriendDisplayed({ Img, name, distance, userId }) {
    return (
        <div className="animeDisplayed" onClick={()=>{redirectToFriendProfile(userId)}}>
            <img style={{borderRadius: '50%', height:'150px', width:'150px'}} src={Img} />
            <div className="friendNameDisplayed">{name}</div>
            <div className="friendDegreeDisplayed">Friendship Degree: {distance}</div>
        </div>
    )
}
export { FriendDisplayed };
