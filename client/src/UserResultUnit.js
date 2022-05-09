import React, {useEffect, useState} from "react";
import anime from "./image/anime.jpeg";
import female from "./image/woman.jpeg";
import male from "./image/male.jpeg";
import unknown from "./image/unknown.jpeg";

let user;
function getAvatar(gender) {
    let avatar;
    if (gender === 'Male') {
        avatar = male;
    } else if (gender === 'Female') {
        avatar = female;
    } else {
        avatar = unknown;
    }
    console.log(gender);
    return avatar;
}
export default function UserResultUnit({userObj}){
    function getDetails(){
    window.location.replace(`/profile?userId=${userObj.userId}`);
    }
    useEffect(()=>{
        user = userObj;
    })
    return(
        <div className="resultUnit" onClick={() => { getDetails(); }}>
            <div className="resultImg">
                <img style={{borderRadius:'50%', width: '150px', height: '150px'}} src={getAvatar(userObj.gender)} />
            </div>
            <div className="resultInfo">
                <h3 style={{fontSize: '30px'}}>{userObj.nickname}</h3>
                <p>Gender: {userObj.gender}</p>
                <p>Age: {userObj.age}</p>
                {/*{gameObj.synopsis}*/}
            </div>
        </div>
    )
}
export { UserResultUnit };
