import React, { useEffect, useState } from 'react';
import './view/Profile.css'
import Logo from './Logo';
import female from "./image/woman.jpeg";
import male from "./image/male.jpeg";
import unknown from "./image/unknown.jpeg";
import anime from './image/anime.jpeg';
import AnimeDisplayed from "./AnimeDisplayedUnit";
import FriendDisplayed from "./FriendDisplayedUnit";
import axios from "axios";
import ResultUnit from "./resultUnit";
import { Pagination } from 'antd';
import 'antd/dist/antd.min.css'

let userId;
let avatar;
let friend;
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

// async function getFriends(id) {
//     const info = await axios.get(`${link}/recommend_friends?userId=${id}`).catch((err) => { console.log(err); });
//     console.log(info);
//     return info.data.results;
// }

async function getFriends(id) {
    let result = [];
    let url = `${link}/recommend_friends?userId=${id}`;
    const info = await axios.get(url).catch((err) => { console.log(err); });
    if (info.data.error || info.data.results.length === 0) {
        console.log(info);
    } else {
        result = result.concat(info.data.results);
    }
    return result;
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

function redirectToAnime(animeId) {
    window.location.replace(`/game?id=${animeId}`);
}

function redirectToFriend(userId) {
    window.location.replace(`/profile?userId=${userId}`);
}

export default function Profile() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    userId = params.get('userId');
    const [info, setInfo] = useState({});
    const [animeInfo, setAnimeInfo] = useState([]);
    const [comments, setComments] = useState([]);
    const [friends, setFriends] = useState([]);

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pagesize, setPagesize] = useState(3);

    const [totalFriend, setTotalFriend] = useState(0);
    const [pageFriend, setPageFriend] = useState(1);
    const [pagesizeFriend, setPagesizeFriend] = useState(3);

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
            setFriends(result);
            setTotalFriend(result.length)
        })
        getUserComments(userId).then((result) => {
            console.log(result);
            setTotal(result.length)
            setComments(result);
        })
    },
        [])
    console.log(info);

    return (
        <div className="body">
            <Logo />
            <div className="username">
                {username}
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
                    <div className="typeText">Friends Recommendation</div>
                    <div className="friendList">
                        {(friends != null && friends.slice((pageFriend - 1) * pagesizeFriend, pageFriend * pagesizeFriend).map((one) => (
                            <FriendDisplayed userImg={checkGender(one.gender)} id={one.nickname} degree={one.n} />
                        )))}
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", paddingBottom: "20px" }}>
                    <Pagination
                        total={totalFriend}
                        showSizeChanger
                        showTotal={totalFriend => `Total ${totalFriend} friends`}
                        onChange={(pageFriend, pagesizeFriend) => {
                            setPageFriend(pageFriend);
                            setPagesizeFriend(pagesizeFriend);
                        }}
                        pageSizeOptions={[3, 5, 10]}
                        defaultPageSize={3}
                    />
                </div>

                {/* <div className="profileInfo">
                    <div className="typeText">Friends Recommendation</div>
                    {(friends != null && friends.map((one) => (
                        <div className="friendList" onClick={() => { redirectToFriend(one.ID) }}>
                            <div>
                                <div>Nickname: {one.nickname}</div>
                                <div>Frienship Degree: {one.n}</div>
                            </div>
                        </div>
                    )))}
                </div> */}



                <div className="profileInfo">
                    <div className="typeText">Recently Commented</div>
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
