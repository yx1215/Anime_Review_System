import React, {useEffect, useState} from 'react';
import './view/Profile.css'
import Logo from './Logo';
import female from "./image/woman.jpeg";
import male from "./image/male.jpeg";
import unknown from "./image/unknown.jpeg";
import anime from './image/anime.jpeg';
import AnimeDisplayed from "./AnimeDisplayedUnit";
import axios from "axios";
import ResultUnit from "./resultUnit";

let userId;
let avatar;
const link = 'http://localhost:8080';

async function getUserInfo(id){
    const info = await axios.get(`${link}/search/single_user?userId=${id}`).catch((err) => { console.log(err); });
    console.log(info);
    return info.data.results;
}

function setupAnimes(nameList, imgList){
    var nList = nameList.split(",");
    var iList = imgList.split(",");
    var result = [];
    for(var i = 0; i< nList.length; i++){
        result.push({
            name:nList[i].trim(),
            img: iList[i].trim()
        })
    }
    console.log(result);
    return result;
}

function redirectToAnime(animeId){
    window.location.replace(`/game?id=${animeId}`);
}
export default function Profile() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    userId = params.get('userId');
    const [info, setInfo] = useState({});
    const [animeInfo, setAnimeInfo] = useState([]);
    const [comments, setComments] = useState([]);
    if(!window.sessionStorage.getItem('username')){
        window.location.replace("/login");
    }
    useEffect(()=>{
        getUserInfo(userId).then((result) => {
            setInfo(result[0]);
            setComments(result);
            if(result[0].gender==="Male"){
                avatar=male;
            }else if(result[0].gender==="Female"){
                avatar=female;
            }else{
                avatar=unknown;
            }
            setAnimeInfo(setupAnimes(result[0].likeAnime, result[0].likeAnimeImg));
        });
    }, [])
    console.log(info);

    return (
        <div className="body">
            <Logo />
            <div className="profile">
                <div className="profileAvatar">
                   <img src={avatar} />
                    <div className="profileName">{info.nickname}</div>
                </div>
                <div className="profileInfo">
                    <div className="typeText">Recent Liked</div>
                    <div className="profileList">
                        {(animeInfo != null && animeInfo.map((one) => (
                            <AnimeDisplayed animeImg={one.img} name={one.name} />
                        )))}
                        {/*{(info!=={}&&[...Array(3)].map((x, i) =>*/}
                        {/*    <AnimeDisplayed animeImg={anime} name={info.likeAnime[i]} />*/}
                        {/*))}*/}
                    </div>

                </div>

                <div className="profileInfo">
                    <div className="typeText">Recent Commented</div>
                    {(comments != null && comments.map((one) => (
                        <div className="commentHistoryUnit" onClick={()=>{redirectToAnime(one.animeId)}}>
                            <div>
                                <img src={avatar}/>
                                <div>Rating: {one.rating}</div>
                            </div>
                            <div className="commentHistoryText">{one.comments}</div>
                        </div>
                    )))}

                </div>
            </div>
        </div>

    )
}
export { Profile };
