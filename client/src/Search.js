import React, { useState } from 'react';
import './view/Search.css'

let username;

function logout() {
    window.sessionStorage.clear();
    window.location.replace(`/login`);
}

export default function Search() {
    const [input, setInput] = useState("");
    // async function helper(){
    //     return await axios.get(`${link}/`).catch((err) => { console.log(err); });
    // }
    if (!window.sessionStorage.getItem('username')) {
        window.location.replace("/login");
    }
    username = window.sessionStorage.getItem('username');
    console.log(username);

    const searchHandler = (e) => {
        setInput(e.target.value);
        console.log(input);
    }

    function searchFunction() {
        let temp;
        var varibles = input.split(";");
        for (var i = 0; i < varibles.length; i++) {
            if (varibles[i].length > 0 && varibles[i].split("=").length === 1) {
                temp = varibles[i];
                varibles[i] = "Title=" + temp;
            }
        }
        temp = varibles.join("&");
        console.log(temp);
        window.location.replace(`/searchResult?${temp}`);
    }

    return (
        <div className="body">
            <div className="username">
                Hello! {username}
            </div>
            {/*<div className="homepage"  onClick={() => {window.location.replace(`/profile?userId=${window.sessionStorage.getItem("userId")}`)}}>*/}
            {/*    My Home Page*/}
            {/*</div>*/}
            <div className="logout" onClick={logout}>
                Logout
            </div>
            <div className="title">
                AniME
            </div>
            <div className="searchBar">
                <input className="input" type='text' onChange={searchHandler} />
                {/* <Route path="/searchResult" component={SearchResult} /> */}
                <button className="searchButton" type="submit" onClick={searchFunction}>
                    find your love</button >
            </div>
            <div className="otherInfo">
                <div className="optionUnit">
                    {/* <Route path="/login" component={Login} />
                    <div className="text" type="button" onClick={handleLogin} >login</div> */}
                    <div className="text"><a href="/login" style={{color: 'black', textDecoration:'none'}}>login</a></div>
                    <div className="line"></div>
                </div>
                <div className="optionUnit">
                    {/* <Route path="/register" component={Register} /> */}
                    {/* <div className="text" type="button" onClick={handleRegister}>register</div> */}
                    <div className="text"><a href="/register" style={{color: 'black',
                        textDecoration:'none'}}>register</a></div>
                    <div className="line"></div>
                </div>
                <div className="optionUnit">
                    {/* <Route path="/register" component={Register} /> */}
                    {/* <div className="text" type="button" onClick={handleRegister}>register</div> */}
                    <div className="text"><a href="https://www.privacypolicies.com/live/1f182c75-4612-433e-8933-8efb40a9d7d9"
                     style={{color: 'black', textDecoration:'none'}}>privacy</a></div>
                    <div className="line"></div>
                </div>
            </div>
        </div>

    )
}
export { Search };
