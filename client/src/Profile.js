import React, { useEffect, useState } from 'react';
import './view/Profile.css'
import Logo from './Logo';
import female from "./image/woman.jpeg";
import male from "./image/male.jpeg";
import unknown from "./image/unknown.jpeg";
import anime from './image/anime.jpeg';
import AnimeDisplayed from "./AnimeDisplayedUnit";
import FriendDisplayed from "./FriendRecommendUnit";
import axios from "axios";
import ResultUnit from "./resultUnit";
import { Pagination } from 'antd';
import 'antd/dist/antd.min.css'

let userId;
let avatar;
let username;
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

function redirectToAnime(animeId) {
    window.location.replace(`/game?id=${animeId}`);
}

function setupFavGenre(results) {
    let genres = []
    for (let i = 0; i < results.length; i++) {
        genres.push(results[i].genreName)
    }
    return genres;
}

export default function Profile() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    userId = params.get('userId');
    const [info, setInfo] = useState({});
    const [animeInfo, setAnimeInfo] = useState([]);
    const [friendInfo, setFriendInfo] = useState([]);
    const [comments, setComments] = useState([]);
    const [favGenre, setFavGenre] = useState([]);

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pagesize, setPagesize] = useState(3);

    if (!window.sessionStorage.getItem('username')) {
        window.location.replace("/login");
    } else {
        username = window.sessionStorage.getItem('username');
    }
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
        getFavGenre(userId).then((result) => {
            console.log(result);
            setFavGenre(setupFavGenre(result))
        })
    },
        [])
    console.log(info);

    return (
        <div className="body">
            <Logo />
            <div className="username">
                Login As: {username}
            </div>
            <div className="homepage" onClick={() => { window.location.replace(`/profile?userId=${window.sessionStorage.getItem("userId")}`) }}>
                My Home Page
            </div>
            <div className="logout" onClick={logout}>
                Logout
            </div>
            <div className="profile">
                <div className="profileAvatar">
                    <img src={avatar} />
                    <div className="profileName">{info.nickname}</div>
                </div>
                <div className="profileInfo">
                    <div className="typeText">Favourite Anime Genre</div>
                    <div className="profileList">
                        {(favGenre != null && favGenre.map((one, index) => (
                            <p key={index} style={{ fontSize: '20px' }}>{one}&nbsp;</p>
                        )))}
                    </div>
                </div>
                <div className="profileInfo">
                    <div className="typeText">Recent Liked</div>
                    <div className="profileList">
                        {(animeInfo != null && animeInfo.map((one) => (
                            <AnimeDisplayed animeImg={one.img} name={one.name} />
                        )))}
                    </div>
                </div>
                <div className="profileInfo">
                    <div className="typeText">Friend Recommend</div>
                    <div className="profileList">
                        {(friendInfo != null && friendInfo.map((one) => (
                            <FriendDisplayed name={one.nickname} distance={one.n} />
                        )))}
                    </div>
                </div>

                <div className="profileInfo">
                    <div className="typeText">Recent Commented</div>
                    {(comments != null && comments.slice((page - 1) * pagesize, page * pagesize).map((one) => (
                        <div className="commentHistoryUnit" onClick={() => { redirectToAnime(one.animeId) }}>
                            <div>
                                <img src={avatar} />
                                <div>Anime: {one.title}</div>
                                <div>Rating: {one.rating}</div>

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