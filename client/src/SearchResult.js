import React, {useEffect, useState} from 'react';
import './view/SearchResult.css';
import Logo from './Logo';
import avatar from './image/woman.jpeg';
import anime from './image/anime.jpeg';
import FilterButton from './FilterButton';
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


export default function SearchResult(){
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

    return(
        <div className="backgroundForGamePage">
            <Logo />
            <div className="avatar">
                <img src={avatar} />
            </div>
            <div>
                <div className="searchGroup">
                    <div className="searchBarSmall">
                        <input className="inputSmall" value={input} onChange={changeInput}/>
                        <button className="searchButtonSmall" onClick={searchFunction}>find your love</button>
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
                            <select name="genre" id="genre" onChange={handleProducer}>
                                    <option value="Producer">Producer</option>
                                    <option value="saab">Saab</option>
                            </select>
                        </div>
                        <div className="filter_button">
                            <form action="/">
                                <select form="genre" name="genre" id="genre" onChange={handleGenre}>
                                    <option value="Genre">Genre</option>
                                    <option value="Action">Action</option>
                                    <option value="Comedy">Comedy</option>
                                </select>
                                {/*<input type="submit" value="Submit" />*/}
                            </form>
                        </div>
                    </div>
                </div>
                <div className="searchResult">
                    {(game != null && game.map((one) => (
                        <ResultUnit gameObj={one}/>
                        )))}
                </div>
            </div>
        </div>

    )
}
export { SearchResult };
