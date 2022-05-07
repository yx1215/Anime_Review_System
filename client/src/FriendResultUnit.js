import React, { useEffect, useState } from "react";


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
