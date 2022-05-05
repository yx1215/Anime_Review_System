<<<<<<< HEAD
<<<<<<< HEAD
import React, {useEffect, useState} from 'react';
=======
import React from 'react';
>>>>>>> c6048575ce11ea6a244e288ee22ffe66eab0c46c
=======
import React, {useEffect, useState} from 'react';
>>>>>>> b262488638d4fed41fdad2be1ab57f2f62eeae77
import './view/SearchResult.css';
import Logo from './Logo';
import avatar from './image/woman.jpeg';
import anime from './image/anime.jpeg';
import FilterButton from './FilterButton';
<<<<<<< HEAD
<<<<<<< HEAD
import axios from "axios";
import ResultUnit from "./resultUnit";
=======
import axios from "axios";
import ResultUnit from "./resultUnit";


const link = 'http://localhost:8080';
let animeTitle;
let animeGenre;
let animeProducer;
let animeSynopsis;
let animeNew;
let animePopularity;

async function getGame(){
    let url = `${link}/search/animations?`;
    let pool = [];
    if (animeTitle){
        pool.push(`Title=${animeTitle}`);
    }
    if(animeGenre){
        pool.push(`Genre=${animeGenre}`);
    }
    if (animeProducer){
        pool.push(`Producer=${animeProducer}`);
    }
    if (animeSynopsis){
        pool.push(`Synopsis=${animeSynopsis}`);
    }
    let stringy = pool.join("&");
    url +=stringy;
    const info = await axios.get(url).catch((err) => { console.log(err); });
    console.log(info);
    return info.data.results;
}

async function getGameBasedOnTime(){
    let url = `${link}/animations/genre_aired`;
    const info = await axios.get(url).catch((err) => { console.log(err); });
    console.log(info);
    return info.data.results;
}

async function getGameBasedOnPopularity(){
    let url = `${link}/animations/genre_score`;
    const info = await axios.get(url).catch((err) => { console.log(err); });
    console.log(info);
    return info.data.results;
}

>>>>>>> b262488638d4fed41fdad2be1ab57f2f62eeae77


const link = 'http://localhost:8080';
let animeTitle;
let animeGenre;
let animeProducer;
let animeSynopsis;
// let searchUrl;
async function getGame(){
    let url = `${link}/search/animations?`;
    let pool = [];
    if (animeTitle){
        pool.push(`Title=${animeTitle}`);
    }
    if(animeGenre){
        pool.push(`Genre=${animeGenre}`);
    }
    if (animeProducer){
        pool.push(`Producer=${animeProducer}`);
    }
    if (animeSynopsis){
        pool.push(`Synopsis=${animeSynopsis}`);
    }
    let stringy = pool.join("&");
    url +=stringy;
    const info = await axios.get(url).catch((err) => { console.log(err); });
    console.log(info);
    return info.data.results;
}

export default function SearchResult(){
    let search = window.location.search;
    let params = new URLSearchParams(search);
    animeTitle = params.get('Title');
    animeGenre = params.get('Genre');
    animeProducer = params.get('Producer');
    animeSynopsis = params.get('Synopsis');
    const [game, setGame] = useState([]);
    const [genre, setGenre] = useState(null);
    const [producer, setProducer] = useState(null);
    const [input, setInput] = useState("");
    const [searchUrl, setSearchUrl] = useState("");
    // var selected = document.forms[0].genre;
    // var selected2 = document.forms[1].genre.selectedIndex;
    // console.log(selected+";"+selected2);

    useEffect(()=>{
        getGame().then((result)=>{
            setGame(result);
        })

    },[])

    function handleGenre(e){
        console.log(e.target.value);
        setGenre(e.target.value);
        setInput(input+"Genre="+e.target.value+";");
    }

    function handleProducer(e){
        setProducer(e.target.value);
        console.log(e.target.value);
        setInput(input+"Producer="+e.target.value+";");
    }

    function changeInput(e){
        setInput(e.target.value);
        console.log(input);
    }

    function searchFunction(){
        let temp;
        var varibles = input.split(";");
        for (var i = 0; i< varibles.length; i++){
            if (varibles[i].length>0 && varibles[i].split("=").length===1){
                temp = varibles[i];
                varibles[i]="Title="+temp;
            }
        }
        temp = varibles.join("&");
        // if (temp.endsWith('&')){
        //     temp = temp.substring(0, searchUrl.length-2);
        // }
        console.log(temp);
        window.location.replace(`/searchResult?${temp}`);
    }
=======
export default function SearchResult(){
<<<<<<< HEAD
>>>>>>> c6048575ce11ea6a244e288ee22ffe66eab0c46c
=======
    let search = window.location.search;
    let params = new URLSearchParams(search);
    animeTitle = params.get('Title');
    animeGenre = params.get('Genre');
    animeProducer = params.get('Producer');
    animeSynopsis = params.get('Synopsis');
    animeNew = params.get('New');
    animePopularity = params.get('Popularity');
    const [game, setGame] = useState([]);
    const [genre, setGenre] = useState(null);
    const [producer, setProducer] = useState(null);
    const [input, setInput] = useState("");
    const [searchUrl, setSearchUrl] = useState("");
    if(!window.sessionStorage.getItem('username')){
        window.location.replace("/login");
    }

    useEffect(()=>{
        if (animeNew==='1'){
            getGameBasedOnTime().then((result) => {
                setGame(result);
            })
        }else if(animePopularity==="1"){
            getGameBasedOnPopularity().then((result) => {
                setGame(result);
            })
        }else{
            getGame().then((result) => {
                setGame(result);
                if (animeTitle) {
                    setInput("Title=" + animeTitle + ";");
                    // filter.Title=animeTitle;
                }
                if (animeGenre) {
                    // filter.Genre = animeGenre;
                    setInput(prevState => prevState + "Genre=" + animeGenre + ";");
                }
                if (animeProducer) {
                    // filter.Producer = animeProducer;
                    setInput(prevState => prevState + "Producer=" + animeProducer + ";");
                }

            });
        }
    },[])

    function handleGenre(e){
        console.log(e.target.value);
        setGenre(e.target.value);
        // filter.Genre = e.target.value;
        setInput(input+"Genre="+e.target.value+";");
    }

    function handleProducer(e){
        setProducer(e.target.value);
        console.log(e.target.value);
        // filter.Producer = e.target.value;
        setInput(input+"Producer="+e.target.value+";");
    }

    function findByTime(e){
        console.log(e.target.value);
        window.location.replace(`/searchResult?New=1`);
    }

    function findByPopularity(e){
        console.log(e.target.value);
        window.location.replace(`/searchResult?Popularity=1`);
    }

    function changeInput(e){
        setInput(e.target.value);
        console.log(input);
    }

    function searchFunction(){
        let temp;
        if(input==="New=1;"){
            window.location.replace(`/searchResult?New=1`);
        }
        var varibles = input.split(";");
        for (var i = 0; i< varibles.length; i++){
            if (varibles[i].length>0 && varibles[i].split("=").length===1){
                temp = varibles[i];
                varibles[i]="Title="+temp;
            }
        }
        temp = varibles.join("&");
        // if (temp.endsWith('&')){
        //     temp = temp.substring(0, searchUrl.length-2);
        // }
        console.log(temp);
        window.location.replace(`/searchResult?${temp}`);
    }

    function findUser(){
        setInput("User=");
    }

>>>>>>> b262488638d4fed41fdad2be1ab57f2f62eeae77
    return(
        <div className="backgroundForGamePage">
            <Logo />
            <div className="avatar">
                <img src={avatar} />
            </div>
            <div>
<<<<<<< HEAD
<<<<<<< HEAD
                <div className="searchGroup">
                    <div className="searchBarSmall">
                        <input className="inputSmall" value={input} onChange={changeInput}/>
                        <button className="searchButtonSmall" onClick={searchFunction}>find your love</button>
=======

                <div className="searchGroup">
                    <div className="searchBarSmall">
                        <input className="inputSmall"/>
                        <button className="searchButtonSmall">find your love</button>
>>>>>>> c6048575ce11ea6a244e288ee22ffe66eab0c46c
=======
                <div className="searchGroup">
                    <div className="searchBarSmall">
                        <input className="inputSmall" value={input} onChange={changeInput}/>
                        <button className="searchButtonSmall" onClick={searchFunction}>find your love</button>
>>>>>>> b262488638d4fed41fdad2be1ab57f2f62eeae77
                    </div>
                    <div className="searchFilter">

                        <FilterButton filterName="Trending"/>
                        <FilterButton filterName="Most Viewed"/>
                        <div className="filter_button" onClick={findByPopularity}>
                            <div className="filter">Highly Rated</div>
                        </div>
                        {/*<FilterButton filterName="Highly Rated"/>*/}
                        {/*<FilterButton filterName="New" onClick={() => { findByTime();}} />*/}
                        <div className="filter_button" onClick={findByTime}>
                            <div className="filter">New</div>
                        </div>
                        {/*<FilterButton filterName="User"/>*/}
                        <div className="filter_button" onClick={findUser}>
                            <div className="filter">User</div>
                        </div>
                        <div className="filter_button">
<<<<<<< HEAD
<<<<<<< HEAD
                            <select name="genre" id="genre" onChange={handleProducer}>
=======
                            <select name="genre" id="genre">
>>>>>>> c6048575ce11ea6a244e288ee22ffe66eab0c46c
=======
                            <select name="genre" id="genre" onChange={handleProducer}>
>>>>>>> b262488638d4fed41fdad2be1ab57f2f62eeae77
                                    <option value="Producer">Producer</option>
                                    <option value="saab">Saab</option>
                            </select>
                        </div>
                        <div className="filter_button">
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b262488638d4fed41fdad2be1ab57f2f62eeae77
                            <form action="/">
                                <select form="genre" name="genre" id="genre" onChange={handleGenre}>
                                    <option value="Genre">Genre</option>
                                    <option value="Action">Action</option>
                                    <option value="Comedy">Comedy</option>
                                </select>
                                {/*<input type="submit" value="Submit" />*/}
                            </form>
<<<<<<< HEAD
=======
                            <select name="genre" id="genre">
                                <option value="Genre">Genre</option>
                                <option value="saab">Saab</option>
                            </select>
>>>>>>> c6048575ce11ea6a244e288ee22ffe66eab0c46c
=======
>>>>>>> b262488638d4fed41fdad2be1ab57f2f62eeae77
                        </div>
                    </div>
                </div>
                <div className="searchResult">
<<<<<<< HEAD
<<<<<<< HEAD
                    {(game != null && game.map((one) => (
                        <ResultUnit gameObj={one}/>
                        )))}
=======
                    <div className="resultUnit">
                        <div className="resultImg">
                            <img src={anime} />
                        </div>
                        <div className="resultInfo">
                            <h4>Lorem ipsum dolor sit ame</h4>
                            <p>Year: 2016</p>       <p>Producer: minim veniam</p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                            est laborum...
                        </div>
                    </div>
                    <div className="resultUnit">
                        <div className="resultImg">
                            <img src={anime} />
                        </div>
                        <div className="resultInfo">
                            <h4>Lorem ipsum dolor sit ame</h4>
                            <p>Year: 2016</p>       <p>Producer: minim veniam</p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                            est laborum...
                        </div>
                    </div>
                    <div className="resultUnit">
                        <div className="resultImg">
                            <img src={anime} />
                        </div>
                        <div className="resultInfo">
                            <h4>Lorem ipsum dolor sit ame</h4>
                            <p>Year: 2016</p>       <p>Producer: minim veniam</p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                            est laborum...
                        </div>
                    </div>
                    <div className="resultUnit">
                        <div className="resultImg">
                            <img src={anime} />
                        </div>
                        <div className="resultInfo">
                            <h4>Lorem ipsum dolor sit ame</h4>
                            <p>Year: 2016</p>       <p>Producer: minim veniam</p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                            est laborum...
                        </div>
                    </div>
                    <div className="resultUnit">
                        <div className="resultImg">
                            <img src={anime} />
                        </div>
                        <div className="resultInfo">
                            <h4>Lorem ipsum dolor sit ame</h4>
                            <p>Year: 2016</p>       <p>Producer: minim veniam</p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                            est laborum...
                        </div>
                    </div>
>>>>>>> c6048575ce11ea6a244e288ee22ffe66eab0c46c
=======
                    {(game != null && game.map((one) => (
                        <ResultUnit gameObj={one}/>
                        )))}
>>>>>>> b262488638d4fed41fdad2be1ab57f2f62eeae77
                </div>
            </div>
        </div>

    )
}
export { SearchResult };
