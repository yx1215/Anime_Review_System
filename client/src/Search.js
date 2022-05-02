import React, {useEffect} from 'react';
import './view/Search.css'
import axios from "axios";
import {ReactSession} from "react-client-session";

const link = 'http://localhost:8080';

// async function helper(){
//     return await axios.get(`${link}/`).catch((err) => { console.log(err); });
// }
export default function Search(){
    useEffect(()=>{

    },[])
    if(!window.sessionStorage.getItem('username')){
        window.location.replace("/login");
    }
    return(
        <div className="body">
            <div className="title">
                AniME
            </div>
            <div className="searchBar">
                <input className="input"/>
                <button className="searchButton">find your love</button>
            </div>
            <div className="otherInfo">
                <div className="optionUnit">
                    <div className="text">login</div>
                    <div className="line"></div>
                </div>
                <div className="optionUnit">
                    <div className="text">register</div>
                    <div className="line"></div>
                </div>
            </div>
        </div>

    )
}
export { Search };
