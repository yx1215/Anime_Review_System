import React, {useEffect, useState} from "react";
import anime from "./image/anime.jpeg";
import female from "./image/woman.jpeg";
import male from "./image/male.jpeg";
import unknown from "./image/unknown.jpeg";

let user;
let avatar;
export default function UserResultUnit({userObj}){
    function getDetails(){
    window.location.replace(`/profile?userId=${userObj.userId}`);
    }
    useEffect(()=>{
        user = userObj;
        // if(userObj.gender==="Male"){
        //     avatar=male;
        // }else if(userObj.gender==="Female"){
        //     avatar=female;
        //     console.log(userObj.gender);
        // }else{
        //     avatar=unknown;
        // }
    })
    return(
        <div className="resultUnit" onClick={() => { getDetails(); }}>
            <div className="resultImg">
                <img src={avatar} />
            </div>
            <div className="resultInfo">
                <h3>{userObj.nickname}</h3>
                <p>Gender: {userObj.gender}</p>
                <p>Age: {userObj.age}</p>
                {/*{gameObj.synopsis}*/}
            </div>
        </div>
    )
}
export { UserResultUnit };
