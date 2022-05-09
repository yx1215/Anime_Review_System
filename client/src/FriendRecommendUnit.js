import React from 'react';
import './view/AnimeDisplayed.css';
import female from "./image/woman.jpeg";
import male from "./image/male.jpeg";
import unknown from "./image/unknown.jpeg";

function getAvatar(gender){
    let avatar;
    if(gender==='Male'){
        avatar=male;
    }else if (gender==='Female'){
        avatar = female;
    }else{
        avatar = unknown;
    }
    console.log(gender);
    return avatar;
}
export default function FriendDisplayed({name, distance, gender}){
    return(
        <div className="animeDisplayed">
            <img style={{borderRadius:'50%', width: '150px', height: '150px'}} src={getAvatar(gender)} />
            <div className="animeNameDisplayed">{name}</div>
            <div className="animeNameDisplayed">distance: {distance}</div>
        </div>
    )
}
export { FriendDisplayed };
