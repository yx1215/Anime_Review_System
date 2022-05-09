import React, { useEffect, useState } from 'react';
import './view/Profile.css'
import Logo from './Logo';
import female from "./image/woman.jpeg";
import male from "./image/male.jpeg";
import unknown from "./image/unknown.jpeg";
import youtube from "./image/youtube.png";
import adventure from "./image/Adventure.png";
import comedy from "./image/Comedy.png";
import drama from "./image/Drama.png";
import kids from "./image/Kids.png";
import romance from "./image/Romance.png";
import school from "./image/School.png";
import action from "./image/Action.png";
import unknowGenre from "./image/question-mark.png"
import scifi from "./image/Scifi.png"
import space from "./image/Space.png"
import sports from "./image/Sports.png"
import mystery from "./image/Mystery.png"

import GenreDisplayed from "./GenreDisplayedUnit";
import AnimeDisplayed from "./AnimeDisplayedUnit";
import FriendDisplayed from "./FriendRecommendUnit";
import axios from "axios";
import ResultUnit from "./resultUnit";
import { Pagination } from 'antd';
import 'antd/dist/antd.min.css'
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Rating from "react-star-rating-lite";

let userId;
let avatar;
let username;
let friend;
let genre;

const link = 'http://localhost:8080';

async function getUserInfo(id) {
    const info = await axios.get(`${link}/search/single_user?userId=${id}`).catch((err) => { console.log(err); });
    console.log(info);
    return info.data.results;
}

async function getUserComments(id) {
    const info = await axios.get(`${link}/comments/user?userId=${id}`).catch((err) => { console.log(err); });
    console.log(info);
    return info.data.results;
}

async function getFriends(id) {
    const info = await axios.get(`${link}/recommend_friends?userId=${id}`).catch((err) => { console.log(err); });
    console.log(info);
    return info.data.results;
}

async function getFavGenre(id) {
    const info = await axios.get(`${link}/user/fav_genres?userId=${id}`).catch((err) => { console.log(err); });
    console.log(info);
    return info.data.results;
}

async function getComplete(id) {
    const info = await axios.get(`${link}/user/percen_complete?userId=${id}`).catch((err) => { console.log(err); });
    console.log(info);
    return info.data.result;
}

function logout() {
    window.sessionStorage.clear();
    window.location.replace(`/login`)
}

function setupAnimes(nameList, imgList) {
    var nList = nameList.split(",");
    var iList = imgList.split(",");
    var result = [];
    for (var i = 0; i < nList.length; i++) {
        result.push({
            name: nList[i].trim(),
            img: iList[i].trim()
        })
    }
    console.log(result);
    return result;
}

function setupGenre(genreName) {
    var nList = genreName.split(",");
    var result = [];
    for (var i = 0; i < nList.length; i++) {
        result.push({
            name: nList[i].trim(),
        })
    }
    console.log(result);
    return result;
}

function redirectToAnime(animeId) {
    window.location.replace(`/game?id=${animeId}`);
}


function checkGender(gender) {
    if (gender === "Male") {
        friend = male;
    } else if (gender === "Female") {
        friend = female;
    } else {
        friend = unknown;
    }
    return friend;
}

function checkGenre(genreInput) {
    if (genreInput === "Comedy") {
        genre = comedy;
    } else if (genreInput === "Action") {
        genre = action;
    } else if (genreInput === "Adventure") {
        genre = adventure;
    } else if (genreInput === "Drama") {
        genre = drama;
    } else if (genreInput === "Kids") {
        genre = kids;
    } else if (genreInput === "Romance") {
        genre = romance;
    } else if (genreInput === "School") {
        genre = school;
    } else if (genreInput === "Sci-Fi") {
        genre = scifi;
    } else if (genreInput === "Space") {
        genre = space;
    } else if (genreInput === "Sports") {
        genre = sports;
    } else if (genreInput === "Mystery") {
        genre = mystery;
    } else {
        genre = unknowGenre;
    }
    return genre;
}

export default function Profile() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    userId = params.get('userId');
    const [info, setInfo] = useState({});
    const [animeInfo, setAnimeInfo] = useState([]);
    const [friendInfo, setFriendInfo] = useState([]);
    const [complete, setComplete] = useState([]);
    const [comments, setComments] = useState([]);
    const [favGenre, setFavGenre] = useState([]);
    const [secGenre, setsecGenre] = useState([]);

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pagesize, setPagesize] = useState(3);

    if (!window.sessionStorage.getItem('username')) {
        window.location.replace("/login");
    } else {
        username = window.sessionStorage.getItem('username');
    }

    console.log(comments);
    useEffect(() => {
        getUserInfo(userId).then((result) => {
            setInfo(result[0]);
            if (result[0].gender === "Male") {
                avatar = male;
            } else if (result[0].gender === "Female") {
                avatar = female;
            } else {
                avatar = unknown;
            }
            setAnimeInfo(setupAnimes(result[0].likeAnime, result[0].likeAnimeImg));
        });
        getFriends(userId).then((result) => {
            console.log("friend:", result)
            setFriendInfo(result);
        });
        getUserComments(userId).then((result) => {
            console.log(result);
            setTotal(result.length)
            setComments(result);
        })
        // getFavGenre(userId).then((result) => {
        //     console.log(result);
        //     setFavGenre(setupFavGenre(result))
        // })

        getFavGenre(userId).then((result) => {
            console.log(result);
            setFavGenre(setupGenre(result[0].genreName));
            setsecGenre(setupGenre(result[1].genreName))
        })

        getComplete(userId).then((result) => {
            console.log(result);
            setComplete(result)
        })
    },
        [])
    console.log(info);

    return (
        <div className="body">
            <Logo />
            <div className="username">
                Hello! {username}
            </div>
            {/*<div className="homepage"  onClick={() => {window.location.replace(`/profile?userId=${window.sessionStorage.getItem("userId")}`)}}>*/}
            {/*    My Home Page*/}
            {/*</div>*/}
            <div className="logout" onClick={logout}>
                Logout
            </div>
            <div className="profile">
                <div className="profileAvatar">
                    <img src={avatar} />
                    <div className="profileName">{info.nickname}</div>
                </div>

                <div className="profileInfo">
                    <div className="typeText">Recently Liked</div>
                    <div className="profileList">
                        {(animeInfo != null && animeInfo.map((one) => (
                            <AnimeDisplayed animeImg={one.img} name={one.name} />
                        )))}
                    </div>
                </div>
                <div className="profileInfo">
                    <div className="typeText">Favorite Anime Genre</div>
                    <div className="profileList">
                        {(favGenre != null && favGenre.map((one) => (
                            <GenreDisplayed animeImg={checkGenre(one.name)} name={one.name} />
                        )))}
                        {(secGenre != null && secGenre.map((one) => (
                            <GenreDisplayed animeImg={checkGenre(one.name)} name={one.name} />
                        )))}
                    </div>
                </div>
                <div className="profileInfo">
                    <div className="typeText">Friend Recommendation</div>
                    <div className="profileList">
                        {(friendInfo != null && friendInfo.map((one) => (
                            <FriendDisplayed Img={checkGender(one.gender)} name={one.nickname} distance={one.n} />
                        )))}
                    </div>
                </div>
                <div className="profileInfo">
                    <div className="typeText">Watch List Completion Rate</div>
                    <div className="profileList">
                        {(complete != null && complete.map((one) => (
                            <div className="completionList">
                                <div>Anime marked as watched: {one.total_watch}</div>
                                <div className="container">{[...Array(one.total_watch)].map((e, i) => (
                                    <div className="completeImg" key={i} ><img src={youtube} /></div>
                                ))}</div>
                                <div>Percentage of liked anime watched: {one.percentOfLikesWatched}%</div>
                                <ProgressBar now={one.percentOfLikesWatched} />
                            </div>
                        )))}
                    </div>
                </div>
                <div className="profileInfo">
                    <div className="typeText">Recently Commented</div>
                    {(comments != null && comments.slice((page - 1) * pagesize, page * pagesize).map((one) => (
                        <div className="commentHistoryUnit" onClick={() => { redirectToAnime(one.animeId) }}>
                            <div className="commentAnime">
                                <div>{one.title}</div>
                                <Rating value={one.rating / 2} weight="20px" readonly />
                            </div>
                            <div className="commentHistoryText">{one.comments}</div>
                        </div>
                    )))}
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", paddingBottom: "20px" }}>
                        <Pagination
                            total={total}
                            showSizeChanger
                            showTotal={total => `Total ${total} comments`}
                            onChange={(page, pagesize) => {
                                setPage(page);
                                setPagesize(pagesize);
                            }}
                            pageSizeOptions={[3, 5, 10]}
                            defaultPageSize={3}
                        />
                    </div>

                </div>
            </div>
        </div>

    )
}
export { Profile };