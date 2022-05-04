import React, { useState } from 'react';
import './view/Search.css'
import { Route, useHistory } from "react-router-dom";
import SearchResult from './SearchResult';
import Login from './Login';
import Register from './Register';

export default function Search() {

    const [input, setInput] = useState("");

    // const history = useHistory();

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     history.push("/searchresult");
    //     window.location.replace(`/searchresult`);
    // };

    // const handleLogin = (e) => {
    //     e.preventDefault();
    //     history.push("/login");
    //     window.location.replace(`/login`);
    // };

    // const handleRegister = (e) => {
    //     e.preventDefault();
    //     history.push("/register");
    //     window.location.replace(`/register`);
    // };

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
                    <div className="text" ><a href="/login">login</a></div>
                    <div className="line"></div>
                </div>
                <div className="optionUnit">
                    {/* <Route path="/register" component={Register} /> */}
                    {/* <div className="text" type="button" onClick={handleRegister}>register</div> */}
                    <div className="text" ><a href="/register">register</a></div>
                    <div className="line"></div>
                </div>
            </div>
        </div>

    )
}
export { Search };
