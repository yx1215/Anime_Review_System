import React, {useEffect, useState} from "react";
import anime from "./image/anime.jpeg";


let game;
export default function ResultUnit({gameObj}){
    function getDetails(){
    window.location.replace(`/game?id=${gameObj.animeId}`);
}
    useEffect(()=>{
        game = gameObj;
    })
    return(
        <div className="resultUnit" onClick={() => { getDetails(); }}>
            <div className="resultImg">
                <img src={gameObj.img_url} />
            </div>
            <div className="resultInfo">
                <h3 style={{fontSize: '30px'}}>{gameObj.title}</h3>
                <b style={{fontSize: '20px'}}>Score: {gameObj.score}</b>
                <p>Aired: {gameObj.aired}</p>       <p>Producer: {gameObj.producer}</p>
                {gameObj.synopsis}
            </div>
        </div>
    )
}
export { ResultUnit };
