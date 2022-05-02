import React, {useEffect, useState} from 'react';
import './view/GamePage.css';
import axios from 'axios';
import Logo from './Logo';
import avatar from './image/woman.jpeg';
import anime from './image/anime.jpeg';
import Rating from 'react-star-rating-lite';

let animeId = null;
const link = 'http://localhost:8080';

async function getGameInfo(id){
    const info = await axios.get(`${link}/animation?id=${id}`).catch((err) => { console.log(err); });
    return info.data.results[0];
}

async function getGameComments(id){
    const info = await axios.get(`${link}/comments?id=${id}`).catch((err) => { console.log(err); });
    console.log(info);
    return info.data.results;
}

function getUserInfo(id){
    window.location.replace(`/profile?userId=${id}`);
}

export default function GamePage(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    animeId = params.get('id');
    const [info, setInfo] = useState({});
    const [comments, setComments] = useState([]);

    if(!window.sessionStorage.getItem('username')){
        window.location.replace("/login");
    }

    useEffect(()=>{
        getGameInfo(animeId).then((result) => {
            setInfo(result);
        });
        getGameComments(animeId).then((result) => {
            setComments(result);
        });
    }, [])
    console.log(comments);

    return(
        <div className="backgroundForGamePage">
            <Logo />
            <div className="avatar">
                <img src={avatar} />
            </div>
            <div className="gameInformation">
                <div className="gameName">{info.title}</div>
                <div className="gameDetails">
                    <div className="gameImage">
                        <img src={info.img_url}/>
                    </div>
                    <div className="gameText">
                        <p>id:       {info.animeId}</p>
                        <p>aired:        {info.aired} </p>
                        <p>producer:                 {info.producer} </p>
                        <p>genre:             {info.genre}</p>
                        <p>age_rate:      {info.age_rate}</p>
                        <p>synopsis:       {info.synopsis}</p>

                    </div>
                    <div className="gameScore">
                        {info.score}
                    </div>
                </div>
                <div className="gameComments">
                    <div className="comments">Comments</div>
                    {(comments != null && comments.map((one) => (
                        <div className="gameCommentUnit" onClick={() => { getUserInfo(one.userId); }}>
                            <div className="userCol">
                                {/*<img src={avatar}/>*/}
                                <div style={{fontWeight: "bold", fontSize: "25px"}}>{one.nickname}</div>
                                <Rating value={one.rating/2} weight="20px" readonly/>
                            </div>
                            <div className="commentText">
                                {one.comments}

                            </div>
                        </div>
                    )))}
                </div>
            </div>
        </div>

    )
}
export { GamePage };
