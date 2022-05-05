import React, {useEffect, useState} from "react";
import anime from "./image/anime.jpeg";

function getDetails(){
    window.location.replace(`/game?id=${game.animeId}`);
}
let game;
export default function ResultUnit({gameObj}){
    useEffect(()=>{
        game = gameObj;
    })
    return(
        <div className="resultUnit" onClick={() => { getDetails(); }}>
            <div className="resultImg">
                <img src={gameObj.img_url} />
            </div>
            <div className="resultInfo">
                <h3>{gameObj.title}</h3>
                <p>Aired: {gameObj.aired}</p>       <p>Producer: {gameObj.producer}</p>
                <p>Score: {gameObj.score}</p>
                {gameObj.synopsis}
            </div>
        </div>
    )
}
export { ResultUnit };
