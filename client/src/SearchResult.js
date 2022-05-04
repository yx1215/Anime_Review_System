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
                        <FilterButton filterName="Highly Rated"/>
                        <FilterButton filterName="New"/>
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
