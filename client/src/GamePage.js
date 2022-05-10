import React, { useEffect, useState } from 'react';
import './view/GamePage.css';
import axios from 'axios';
import Logo from './Logo';
import avatar from './image/woman.jpeg';
import anime from './image/anime.jpeg';
import Rating from 'react-star-rating-lite';
import { Pagination } from "antd";
import 'antd/dist/antd.min.css'
import male from "./image/male.jpeg";
import female from "./image/woman.jpeg";
import unknown from "./image/unknown.jpeg";

let animeId = null;
let username;
const link = 'http://localhost:8080';

async function getGameInfo(id) {
    const info = await axios.get(`${link}/animation?id=${id}`).catch((err) => { console.log(err); });
    console.log(info);
    return info.data.results[0];
}

function getAvatar(gender) {
    let avatar;
    if (gender === 'Male') {
        avatar = male;
    } else if (gender === 'Female') {
        avatar = female;
    } else {
        avatar = unknown;
    }
    return avatar;
}

async function makeComments(userId, animeId, comment, rating){
    const info = await axios.post(`${link}/comments/anime?userId=${userId}&animeId=${animeId}&comment=${comment}&rating=${rating}`).catch((err) => { console.log(err); });
    console.log(info);
    return info.data;
}

async function getGameComments(id){
    const info = await axios.get(`${link}/comments/anime?animeid=${id}`).catch((err) => { console.log(err); });
    console.log(info);
    return info.data.results;
}

async function getGameScore(id) {
    const info = await axios.get(`${link}/anime/avg?animeId=${id}`).catch((err) => { console.log(err); });
    console.log(info);
    return info.data.result;
}

function getUserInfo(id) {
    window.location.replace(`/profile?userId=${id}`);
}

function logout() {
    window.sessionStorage.clear();
    window.location.replace(`/login`);
}

export default function GamePage() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    animeId = params.get('id');
    const [info, setInfo] = useState({});
    const [comments, setComments] = useState([]);
    const [score, setScore] = useState([]);

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pagesize, setPagesize] = useState(3);


    if (!window.sessionStorage.getItem('username')) {
        window.location.replace("/login");
    } else {
        username = window.sessionStorage.getItem('username');
    }

    useEffect(() => {
        getGameInfo(animeId).then((result) => {
            setInfo(result);
        });
        getGameScore(animeId).then((result) => {
            setScore(result[0]);
        });
        getGameComments(animeId).then((result) => {
            setTotal(result.length)
            setComments(result);
        });
    }, [])
    console.log(comments);



    return (
        <div className="backgroundForGamePage">
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
            <div className="gameInformation">
                <div className="gameName">{info.title}</div>
                <div className="gameDetails">
                    <div className="gameImage">
                        <img src={info.img_url} />
                    </div>
                    <div className="gameText">
                        <p>id:       {info.animeId}</p>
                        <p>aired:        {info.aired} </p>
                        <p>producer:     {info.producer} </p>
                        <p>genre:        {info.genre}</p>
                        <p>age_rate:     {info.age_rate}</p>
                        <p>synopsis:     {info.synopsis}</p>

                    </div>
                    <div className="gameScore">
                        {info.score}
                    </div>
                </div>
                <div className="gameAvgScore">
                    <div className="avgScore">Audience Receptions</div>
                    {/* {(score != null && score.map((one) => (
                        <div className="scoreUnit" onClick={() => { getGameScore(one.animeId); }}>
                            <div className="subAScore"> Audience Average Score: {one.avg_audience_score}
                                <Rating value={one.avg_audience_score / 2} weight="20px" readonly />
                            </div>
                            <div className="subScore"> Average Score upon Completion: {one.avg_complete_audience_score}
                                <Rating value={one.avg_complete_audience_score / 2} weight="20px" readonly />
                            </div>
                        </div>
                    )))} */}
                    <div className="scoreUnit">
                        <div className="subAScore"> Audience Average Score: {score.avg_audience_score}
                            {/* <Rating value={score.avg_audience_score / 2} weight="20px" readonly /> */}
                        </div>
                        <div className="subScore"> Average Score upon Completion: {score.avg_complete_audience_score}
                            {/* <Rating value={score.avg_complete_audience_score / 2} weight="20px" readonly /> */}
                        </div>
                    </div>
                </div>
                <div className="gameComments">
                    <div className="comments">Comments</div>
                    {(comments != null && comments.slice((page - 1) * pagesize, page * pagesize).map((one) => (
                        <div className="gameCommentUnit" onClick={() => { getUserInfo(one.userId); }}>
                            <div className="userCol">
                                <img style={{borderRadius:'50%', width: '100px', height: '100px'}} src={getAvatar(one.gender)} />
                                <div style={{fontWeight: "bold", fontSize: "25px"}}>{one.nickname}</div>
                                <Rating value={one.rating/2} weight="20px" readonly/>
                            </div>
                            <div className="commentText">
                                {one.comments}

                            </div>
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
export { GamePage };
