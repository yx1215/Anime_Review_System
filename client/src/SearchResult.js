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

    useEffect(()=>{
        getGame().then((result)=>{
            setGame(result);
        })
    },[])

    return(
        <div className="backgroundForGamePage">
            <Logo />
            <div className="avatar">
                <img src={avatar} />
            </div>
            <div>
                <div className="searchGroup">
                    <div className="searchBarSmall">
                        <input className="inputSmall" />
                        <button className="searchButtonSmall">find your love</button>
                    </div>
                    <div className="searchFilter">
                        <FilterButton filterName="Trending"/>
                        <FilterButton filterName="Most Viewed"/>
                        <FilterButton filterName="Highly Rated"/>
                        <FilterButton filterName="New"/>
                        <div className="filter_button">
                            <select name="genre" id="genre">
                                    <option value="Producer">Producer</option>
                                    <option value="saab">Saab</option>
                            </select>
                        </div>
                        <div className="filter_button">
                            <select name="genre" id="genre">
                                <option value="Genre">Genre</option>
                                <option value="saab">Saab</option>
                            </select>
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
