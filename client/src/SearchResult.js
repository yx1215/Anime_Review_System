import React from 'react';
import './view/SearchResult.css';
import Logo from './Logo';
import avatar from './image/woman.jpeg';
import anime from './image/anime.jpeg';
import FilterButton from './FilterButton';

export default function SearchResult(){
    return(
        <div className="backgroundForGamePage">
            <Logo />
            <div className="avatar">
                <img src={avatar} />
            </div>
            <div>

                <div className="searchGroup">
                    <div className="searchBarSmall">
                        <input className="inputSmall"/>
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
                </div>
            </div>
        </div>

    )
}
export { SearchResult };
