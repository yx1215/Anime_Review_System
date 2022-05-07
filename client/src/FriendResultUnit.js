import React, { useEffect, useState } from "react";
import anime from "./image/anime.jpeg";
import female from "./image/woman.jpeg";
import male from "./image/male.jpeg";
import unknown from "./image/unknown.jpeg";

let friend;
let avatar;


export default function FriendResultUnit({ friendObj }) {
    function getDetails() {
        window.location.replace(`/profile?userId=${friendObj.ID}`);
    }
    useEffect(() => {
        friend = friendObj;
    })
    return (
        <div className="resultUnit" onClick={() => { getDetails(); }}>
            <div className="resultImg">
                <img src={avatar} />
            </div>
            <div className="resultInfo">
                <h3>{friendObj.nickname}</h3>
                <p>ID: {friendObj.ID}</p>
                <p>Friendship degree: {friendObj.n}</p>
            </div>
        </div>
    )
}
export { FriendResultUnit };
